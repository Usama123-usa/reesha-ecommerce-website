import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { name, price, category_id, description, status } = await request.json();

    if (!name || price === undefined || price === null || !category_id) {
      return NextResponse.json({ error: 'Name, price, and category are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{ name, price, category_id, description, status }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Create product error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, images, ...fields } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
    }

    if (Object.keys(fields).length > 0) {
      const { error } = await supabaseAdmin
        .from('products')
        .update(fields)
        .eq('id', id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    if (Array.isArray(images) && images.length > 0) {
      const rows = images.map((image_url: string) => ({ product_id: id, image_url }));
      const { error: imgError } = await supabaseAdmin
        .from('product_images')
        .insert(rows);

      if (imgError) {
        return NextResponse.json({ error: imgError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Update product error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
    }

    // Delete associated product images first (foreign key safety)
    const { error: imgError } = await supabaseAdmin
      .from('product_images')
      .delete()
      .eq('product_id', id);

    if (imgError) {
      console.error('Error deleting product images:', imgError.message);
      // Non-fatal — continue with product deletion
    }

    // Delete the product
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete product error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}
