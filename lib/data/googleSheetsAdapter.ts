import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import type { DataStore } from './repository';
import type { CategoryItem, OrderPayload, OrderRecord, ProductItem } from './types';

const PRODUCTS_SHEET_NAME = 'products';
const CATEGORIES_SHEET_NAME = 'categories';
const ORDERS_SHEET_NAME = 'orders';

function normalizeHeaders(headerRow: unknown[]): string[] {
  return headerRow.map((header) => String(header ?? '').trim().toLowerCase());
}

function parseSheetRows(rows: unknown[][]) {
  const headers = normalizeHeaders(rows[0] ?? []);
  return rows.slice(1).map((row) => {
    return headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = String(row[index] ?? '').trim();
      return acc;
    }, {});
  });
}

function parseProduct(row: Record<string, string>): ProductItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    priceCents: Number(row.price_cents ?? '0'),
    currency: row.currency || 'USD',
    categoryIds: row.category_ids
      ? row.category_ids.split(',').map((value) => value.trim()).filter(Boolean)
      : [],
    images: [],
    stockQuantity: row.stock_quantity === '' ? null : Number(row.stock_quantity),
    status: (row.status as ProductItem['status']) || 'active',
  };
}

function parseCategory(row: Record<string, string>): CategoryItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
  };
}

function parseOrder(row: Record<string, string>): OrderRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    payload: {
      name: row.customer_name,
      email: row.customer_email,
      shippingAddress: JSON.parse(row.shipping_address_json || '{}'),
      items: JSON.parse(row.items_json || '[]'),
      note: row.notes || undefined,
    },
    status: (row.status as OrderRecord['status']) || 'pending',
  };
}

export class GoogleSheetsDataStore implements DataStore {
  constructor(private sheetId: string, private serviceAccountKeyPath: string) {}

  private async getSheetsClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.serviceAccountKeyPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  }

  private async readRows(range: string) {
    const sheets = await this.getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range,
    });

    return (response.data.values ?? []) as unknown[][];
  }

  async getActiveProducts(): Promise<ProductItem[]> {
    const rows = await this.readRows(`${PRODUCTS_SHEET_NAME}!A:H`);
    if (rows.length === 0) return [];
    return parseSheetRows(rows).map(parseProduct).filter((product) => product.status === 'active');
  }

  async getProductById(productId: string): Promise<ProductItem | null> {
    const products = await this.getActiveProducts();
    return products.find((product) => product.id === productId) ?? null;
  }

  async getCategories(): Promise<CategoryItem[]> {
    const rows = await this.readRows(`${CATEGORIES_SHEET_NAME}!A:C`);
    if (rows.length === 0) return [];
    return parseSheetRows(rows).map(parseCategory);
  }

  async createOrder(payload: OrderPayload): Promise<OrderRecord> {
    const record: OrderRecord = {
      id: `order_${randomUUID()}`,
      createdAt: new Date().toISOString(),
      payload,
      status: 'pending',
    };

    const sheets = await this.getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: this.sheetId,
      range: `${ORDERS_SHEET_NAME}!A:H`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            record.id,
            record.createdAt,
            payload.name,
            payload.email,
            JSON.stringify(payload.shippingAddress),
            JSON.stringify(payload.items),
            record.status,
            payload.note ?? '',
          ],
        ],
      },
    });

    return record;
  }

  async findOrderById(orderId: string): Promise<OrderRecord | null> {
    const rows = await this.readRows(`${ORDERS_SHEET_NAME}!A:H`);
    if (rows.length === 0) return null;

    const records = parseSheetRows(rows).map(parseOrder);
    return records.find((order) => order.id === orderId) ?? null;
  }
}
