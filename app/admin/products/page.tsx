'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceCents: 0,
    categoryIds: [] as string[],
    stockQuantity: null as number | null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'priceCents') {
      setFormData({ ...formData, [name]: Math.round(parseFloat(value) * 100) });
    } else if (name === 'stockQuantity') {
      setFormData({ ...formData, [name]: value === '' ? null : parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      categoryIds: [value],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          currency: 'USD',
          images: [],
          status: 'active',
        }),
      });

      if (!response.ok) throw new Error('Failed to create product');

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setMessage('✓ Product added successfully!');
      setFormData({
        name: '',
        description: '',
        priceCents: 0,
        categoryIds: [],
        stockQuantity: null,
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter((p) => p.id !== productId));
      setMessage('✓ Product deleted');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <main className="page-shell">
      <section className="admin-section">
        <h1>Add Products</h1>
        <p>Upload t-shirts, hoodies, digital products, or services.</p>
      </section>

      <section className="admin-form-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-field">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Goldenboy Black T-Shirt"
              required
            />
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What is this product?"
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Price (USD)</label>
              <input
                type="number"
                step="0.01"
                name="priceCents"
                value={formData.priceCents / 100 || ''}
                onChange={handleInputChange}
                placeholder="24.99"
                required
              />
            </div>
            <div className="form-field">
              <label>Stock (optional)</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity || ''}
                onChange={handleInputChange}
                placeholder="Leave blank for unlimited"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Category</label>
            <select value={formData.categoryIds[0] || ''} onChange={handleCategoryChange} required>
              <option value="">Select...</option>
              <option value="apparel">Apparel (T-shirts, Hoodies)</option>
              <option value="digital">Digital Products</option>
              <option value="merch">Merchandise</option>
            </select>
          </div>

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Adding...' : '+ Add Product'}
          </button>

          {message && (
            <div className={`alert ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>
          )}
        </form>
      </section>

      <section className="admin-products-section">
        <h2>Your Store</h2>
        {products.length === 0 ? (
          <p className="empty">No products yet.</p>
        ) : (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>${(p.priceCents / 100).toFixed(2)}</td>
                    <td>{p.stockQuantity || '∞'}</td>
                    <td>
                      <button className="btn-sm" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
