'use client';

import { useRouter } from 'next/navigation';
import type { ProductItem } from '@/lib/data/types';
import { useCart } from '@/lib/components/CartContext';

export default function ProductDetailActions({ product }: { product: ProductItem }) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product.id, 1);
    router.push('/cart');
  };

  return (
    <aside className="product-actions-card">
      <div className="product-price-block">
        <p className="eyebrow">Price</p>
        <p className="product-price-large">${(product.priceCents / 100).toFixed(2)}</p>
      </div>

      <div className="product-availability">
        <p className="eyebrow">Availability</p>
        <p>{product.stockQuantity === null ? 'Open for booking' : `${product.stockQuantity} available`}</p>
      </div>

      <button
        className="button button-primary"
        onClick={handleAdd}
        disabled={product.stockQuantity !== null && product.stockQuantity <= 0}
      >
        Reserve service
      </button>

      <p className="product-detail-note">
        Add this service to your cart, then review your booking before checkout.
      </p>
    </aside>
  );
}
