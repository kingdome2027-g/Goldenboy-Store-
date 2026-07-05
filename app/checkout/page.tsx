'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CheckoutForm from '@/lib/components/CheckoutForm';
import { useCart } from '@/lib/components/CartContext';
import type { ProductItem } from '@/lib/data/types';

export default function CheckoutPage() {
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productsMap, setProductsMap] = useState<Record<string, ProductItem>>({});

  const { items, clearCart, totalItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) return;
        const data = await res.json();
        const map: Record<string, ProductItem> = {};
        data.products.forEach((p: ProductItem) => (map[p.id] = p));
        setProductsMap(map);
      } catch (e) {
        // ignore product name enrichment failures
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (formData: any) => {
    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Add at least one item before placing an order.');
      setOrderStatus('error');
      return;
    }

    setOrderStatus('loading');
    setErrorMessage(null);

    const payload = {
      ...formData,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      setOrderId(data.orderId);
      setOrderStatus('success');
      clearCart();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setOrderStatus('error');
    }
  };

  return (
    <main className="page-shell">
      <section className="checkout-section">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Guest Checkout</p>
            <h1>Complete your order</h1>
          </div>
          <div className="page-actions">
            <Link href="/cart" className="button button-secondary">
              Edit cart ({totalItems})
            </Link>
          </div>
        </div>

        {orderStatus === 'success' && orderId ? (
          <div className="success-panel">
            <h2>Thank you for your order</h2>
            <p>Your order has been received.</p>
            <p className="order-id">Order ID: {orderId}</p>
            <p>You will receive a confirmation email shortly.</p>
            <Link href="/products" className="button button-primary">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {items.map((it) => (
                    <li key={it.productId}>
                      {productsMap[it.productId]?.name ?? it.productId} — Qty: {it.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <CheckoutForm onSubmit={handleSubmit} isLoading={orderStatus === 'loading'} initialItems={items} />

            {orderStatus === 'error' && errorMessage && (
              <div className="error-panel">
                <p className="error-message">{errorMessage}</p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
