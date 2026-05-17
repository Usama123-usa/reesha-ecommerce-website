import { NextRequest, NextResponse } from 'next/server';
import { storefrontHtml } from '@/lib/storefrontHtml';

// Serve the compiled Vite storefront from memory for all non-Next.js paths.
// This is 100% robust on Vercel as it does not rely on filesystem lookups at runtime.
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  try {
    return new NextResponse(storefrontHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Error serving storefront:', err);
    return new NextResponse('Storefront could not be rendered.', { status: 500 });
  }
}
