'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductItem, CategoryItem } from '@/lib/data/types';
import { useCart } from '@/lib/components/CartContext';
import { ArrowRight, Zap, Search } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (productId: string) => {
    addItem(productId, 1);
    router.push('/cart');
  };

  const categoryMap = new Map(categories.map((category) => [category.id, category]));

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryIds.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="page-shell">
      <section className="products-hero">
        <div>
          <p className="eyebrow">Goldenboy services catalog</p>
          <h1>Browse the full marketplace.</h1>
          <p className="intro-copy">
            From content creation to launch support, explore every offering in the Goldenboy ecosystem.
            Pick what you need, book with confidence.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="products-controls">
        <div className="search-bar">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Services
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      {loading ? (
        <div className="products-loading">Loading services...</div>
      ) : error ? (
        <div className="products-error">{error}</div>
      ) : (
        <section className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-header">
                  <div className="product-badge">
                    <Zap className="w-4 h-4" />
                    <span>Service</span>
                  </div>
                  {product.stockQuantity === null && (
                    <span className="availability-badge">Open for booking</span>
                  )}
                </div>

                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-meta">
                  <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>
                  {product.categoryIds.length > 0 && (
                    <div className="product-category">
                      {product.categoryIds.map((catId) => categoryMap.get(catId)?.name).join(', ')}
                    </div>
                  )}
                </div>

                <div className="product-actions">
                  <Link href={`/products/${product.id}`} className="product-link">
                    View details <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="product-btn" onClick={() => handleAdd(product.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No services found matching your search.</p>
              <Link href="/products" className="button button-secondary">
                Clear filters
              </Link>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
