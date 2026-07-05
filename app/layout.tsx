import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { CartProvider } from '@/lib/components/CartContext';

export const metadata: Metadata = {
  title: 'Goldenboy',
  description: 'Creator. Entrepreneur. Building digital culture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-brand">
            <Link href="/">Goldenboy</Link>
          </div>
          <nav className="site-nav">
            <Link href="/projects">Work</Link>
            <Link href="/products">Shop</Link>
            <Link href="/admin/products">Add</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
