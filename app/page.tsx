'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import type { BrandStats } from '@/lib/data/types';

export default function HomePage() {
  const [stats, setStats] = useState<BrandStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/social-media');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayStats = stats
    ? [
        { value: `${(stats.totalFollowers / 1000).toFixed(0)}K`, label: 'Followers' },
        { value: `${(stats.monthlyViews / 1000).toFixed(0)}K`, label: 'Monthly Views' },
      ]
    : [
        { value: '—', label: 'Followers' },
        { value: '—', label: 'Monthly Views' },
      ];

  return (
    <main className="page-shell">
      {/* Hero Section */}
      <section className="hero-panel">
        <div className="hero-copy">
          <h1>Goldenboy</h1>
          <p className="intro-copy">
            Creator. Entrepreneur. Building digital culture.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="button button-primary">
              Shop
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/projects" className="button button-secondary">
              Work
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-stats">
            {displayStats.map((stat, i) => (
              <div key={i} className="stat-block">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          {loading && (
            <div className="sync-indicator">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
