import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

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
