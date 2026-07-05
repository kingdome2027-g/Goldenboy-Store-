import { NextResponse } from 'next/server';
import { orderPayloadSchema } from '../../../lib/validation/order';
import { dataStore } from '../../../lib/data';
import { rateLimit, getRateLimitHeaders } from '../../../lib/utils/rateLimit';
import { logError } from '../../../lib/utils/logging';
import { sendOrderConfirmationEmail } from '../../../lib/utils/email';

// Rate limit: 10 requests per hour per IP
const ORDERS_RATE_LIMIT = 10;
const ORDERS_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const rateLimitResult = rateLimit(
    `orders:${clientIp}`,
    ORDERS_RATE_LIMIT,
    ORDERS_RATE_WINDOW_MS
  );

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(ORDERS_RATE_LIMIT, rateLimitResult.remaining, rateLimitResult.retryAfter),
      }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    logError('Failed to parse order JSON', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload. Please submit a valid order.' },
      { status: 400 }
    );
  }

  const validation = orderPayloadSchema.safeParse(payload);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Order validation failed.', issues: validation.error.format() },
      { status: 422 }
    );
  }

  try {
    // Server-side validation: ensure products exist and stock is sufficient
    const products = await dataStore.getActiveProducts();
    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of validation.data.items) {
      const prod = productMap.get(item.productId);
      if (!prod) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 404 });
      }
      if (prod.status !== 'active') {
        return NextResponse.json({ error: `Product unavailable: ${item.productId}` }, { status: 409 });
      }
      if (prod.stockQuantity !== null && prod.stockQuantity < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for product: ${item.productId}` }, { status: 409 });
      }
    }

    const order = await dataStore.createOrder(validation.data);

    try {
      await sendOrderConfirmationEmail(order.id, validation.data);
    } catch (emailError) {
      logError('Order created but email delivery failed', emailError, {
        orderId: order.id,
        email: validation.data.email,
      });
    }

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    logError('Failed to create order', error);
    return NextResponse.json(
      { error: 'Failed to create order. Please try again later.' },
      { status: 500 }
    );
  }
}
