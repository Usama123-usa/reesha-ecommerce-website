import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { name, image_url } = await request.json();

    if (!name || !image_url) {
      return NextResponse.json({ error: 'Name and image URL are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert([{ name, image_url }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Create category error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, image_url } = await request.json();

    if (!id || !name || !image_url) {
      return NextResponse.json({ error: 'ID, name, and image URL are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('categories')
      .update({ name, image_url })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Update category error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete category error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}
