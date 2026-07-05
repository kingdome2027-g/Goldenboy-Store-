import type { CategoryItem, OrderPayload, OrderRecord, ProductItem } from './types';

export interface DataStore {
  getActiveProducts(): Promise<ProductItem[]>;
  getProductById(productId: string): Promise<ProductItem | null>;
  getCategories(): Promise<CategoryItem[]>;
  createOrder(payload: OrderPayload): Promise<OrderRecord>;
  findOrderById(orderId: string): Promise<OrderRecord | null>;
}
