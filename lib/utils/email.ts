import nodemailer from 'nodemailer';
import type { OrderPayload } from '@/lib/data/types';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM;

export async function sendOrderConfirmationEmail(orderId: string, payload: OrderPayload) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const itemsDescription = payload.items
    .map((item) => `- ${item.productId}: ${item.quantity}`)
    .join('\n');

  const message = {
    from: EMAIL_FROM,
    to: payload.email,
    subject: `Your Golden Store order ${orderId} is confirmed`,
    text: `Hi ${payload.name},\n\n` +
      `Thank you for your order. Your order ${orderId} has been received and is being processed.\n\n` +
      `Order summary:\n${itemsDescription}\n\n` +
      `Shipping address:\n${payload.shippingAddress.line1}\n` +
      `${payload.shippingAddress.line2 ? `${payload.shippingAddress.line2}\n` : ''}` +
      `${payload.shippingAddress.city}, ${payload.shippingAddress.region} ${payload.shippingAddress.postalCode}\n` +
      `${payload.shippingAddress.country}\n\n` +
      `Notes: ${payload.note ?? 'None'}\n\n` +
      `If you have any questions, reply to this email.\n\n` +
      `Thanks,\nThe Golden Store Team`,
  };

  await transporter.sendMail(message);
}
