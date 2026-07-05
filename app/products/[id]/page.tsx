import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dataStore } from '@/lib/data';
import type { ProductItem } from '@/lib/data/types';
import ProductDetailActions from '@/lib/components/ProductDetailActions';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await dataStore.getProductById(params.id);

  if (!product || product.status !== 'active') {
    return notFound();
  }

  return (
    <main className="page-shell">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Service details</p>
          <h1>{product.name}</h1>
          <p className="intro-copy">
            Explore availability, scope, and booking details for this offering before you reserve it.
          </p>
        </div>
        <div className="page-actions">
          <Link href="/products" className="button button-secondary">
            Back to services
          </Link>
        </div>
      </section>

      <section className="product-detail-grid">
        <div className="product-detail-card">
          <div className="product-image-placeholder">Service preview coming soon</div>
          <div className="product-detail-copy">
            <h2>What you get</h2>
            <p>{product.description}</p>
            <dl>
              <dt>Price</dt>
              <dd>${(product.priceCents / 100).toFixed(2)}</dd>
              <dt>Availability</dt>
              <dd>{product.stockQuantity === null ? 'Open for booking' : `${product.stockQuantity} available`}</dd>
              <dt>Category</dt>
              <dd>{product.categoryIds.length > 0 ? product.categoryIds.join(', ') : 'General'}</dd>
            </dl>
          </div>
        </div>

        <ProductDetailActions product={product} />
      </section>
    </main>
  );
}
