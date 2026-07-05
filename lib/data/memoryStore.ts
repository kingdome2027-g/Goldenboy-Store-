import { randomUUID } from 'crypto';
import type { DataStore } from './repository';
import type { CategoryItem, OrderPayload, OrderRecord, ProductItem } from './types';

const products: ProductItem[] = [
  {
    id: 'content_sprint',
    name: 'Content Creation Sprint',
    description: 'A fast-turn package for reels, edits, and launch-ready social content.',
    priceCents: 49900,
    currency: 'USD',
    categoryIds: ['creative-services'],
    images: [],
    stockQuantity: 8,
    status: 'active',
  },
  {
    id: 'brand_strategy',
    name: 'Brand Strategy Session',
    description: 'A focused consultation to sharpen positioning, offer design, and launch messaging.',
    priceCents: 19900,
    currency: 'USD',
    categoryIds: ['strategy'],
    images: [],
    stockQuantity: 12,
    status: 'active',
  },
  {
    id: 'video_retainer',
    name: 'Video Editing Retainer',
    description: 'Monthly editing support for vlogs, interviews, and promotional content.',
    priceCents: 79900,
    currency: 'USD',
    categoryIds: ['creative-services'],
    images: [],
    stockQuantity: 6,
    status: 'active',
  },
  {
    id: 'merch_launch',
    name: 'Merch Launch Kit',
    description: 'Creative direction and launch assets for your next merch or product drop.',
    priceCents: 34900,
    currency: 'USD',
    categoryIds: ['merch'],
    images: [],
    stockQuantity: 10,
    status: 'active',
  },
  {
    id: 'growth_accelerator',
    name: 'Growth Accelerator',
    description: 'A strategy package that turns attention into an evergreen content system.',
    priceCents: 129900,
    currency: 'USD',
    categoryIds: ['strategy'],
    images: [],
    stockQuantity: 4,
    status: 'active',
  },
];

const categories: CategoryItem[] = [
  {
    id: 'creative-services',
    name: 'Creative Services',
    description: 'Content, editing, and visual production packages',
  },
  {
    id: 'strategy',
    name: 'Strategy',
    description: 'Consulting and launch planning for growth-minded brands',
  },
  {
    id: 'merch',
    name: 'Merch & Launch',
    description: 'Merch direction, product drops, and campaign support',
  },
];

const orders: OrderRecord[] = [];

function formatOrderRecord(payload: OrderPayload): OrderRecord {
  return {
    id: `order_${randomUUID()}`,
    createdAt: new Date().toISOString(),
    payload,
    status: 'pending',
  };
}

export const memoryStore: DataStore = {
  async getActiveProducts() {
    return products;
  },

  async getProductById(productId: string) {
    return products.find((product) => product.id === productId) ?? null;
  },

  async getCategories() {
    return categories;
  },

  async createOrder(payload: OrderPayload) {
    const record = formatOrderRecord(payload);
    orders.push(record);
    return record;
  },

  async findOrderById(orderId: string) {
    return orders.find((order) => order.id === orderId) ?? null;
  },
};
