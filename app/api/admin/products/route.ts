import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    
    // Validate required fields
    if (!product.name || !product.description || product.priceCents === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add product to data store
    // In production, this would write to a database
    const savedProduct = {
      ...product,
      id: product.id || `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Store in memory (in production, use database)
    // For now, this demonstrates the API structure
    
    return NextResponse.json(
      { success: true, product: savedProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all products from data store
    const products = await dataStore.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
