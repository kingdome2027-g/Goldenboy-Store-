import { NextResponse } from 'next/server';
import { dataStore } from '../../../lib/data';

export async function GET() {
  try {
    const products = await dataStore.getActiveProducts();
    const categories = await dataStore.getCategories();

    return NextResponse.json({ products, categories }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
