import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// This is a catch-all Route Handler that serves the compiled Vite storefront
// for all non-Next.js (non-admin, non-API) routes, including the root '/'
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  try {
    // Locate and read the index.html from the public directory
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Return the storefront index.html with appropriate headers
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Error serving storefront index.html:', err);
    return new NextResponse('Storefront index.html not found.', { status: 404 });
  }
}
