import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Convert the browser File stream into a Node Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate a unique file name (derive extension from MIME type since
    // compressed Blobs from browser-image-compression don't reliably keep a filename)
    const mimeExt = file.type.split('/').pop();
    const fileExt = mimeExt && mimeExt !== 'octet-stream' ? mimeExt : (file.name.split('.').pop() || 'jpg');
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to 'product-images' bucket using the high-privilege admin client
    const { error: uploadError } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        duplex: 'half'
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get the public URL for the uploaded asset
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, publicUrl });
  } catch (err: any) {
    console.error('Upload API route error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred.' }, { status: 500 });
  }
}
