'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/storefront/ProductCard';
import { supabase } from '@/lib/supabaseClient';

const PAGE_SIZE = 12;

function ShopListingClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch categories once on mount
  useEffect(() => {
    async function fetchCategories() {
      const { data: catData } = await supabase.from('categories').select('*').order('name');
      if (catData) setCategories(catData);
    }
    fetchCategories();
  }, []);

  // Fetch products whenever the category (URL) changes
  useEffect(() => {
    const catId = searchParams.get('category') || 'all';
    setSelectedCategory(catId);
    setCurrentPage(1);
    fetchProducts(catId, 1);
  }, [searchParams]);

  async function fetchProducts(categoryId: string, page: number) {
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from('products')
      .select('*, product_images(image_url)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(1, { foreignTable: 'product_images' })
      .range(from, to);

    if (categoryId !== 'all') {
      query = query.eq('category_id', categoryId);
    }

    const { data, count } = await query;

    if (data) {
      const mappedProducts = data.map(p => ({
        ...p,
        image: p.product_images?.[0]?.image_url || '/placeholder.svg'
      }));
      setProducts(mappedProducts);
    }
    setTotalCount(count || 0);
    setLoading(false);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    fetchProducts(selectedCategory, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    
    // Programmatically set URL query params in Next.js
    const params = new URLSearchParams(window.location.search);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    
    setIsFilterOpen(false);
  };

  return (
    <main className="pt-32 pb-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-16 text-center">
        <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary mb-4 font-headline">
          {selectedCategory === 'all' 
            ? 'Curated Gift Collections' 
            : categories.find(c => c.id === selectedCategory)?.name || 'Collection'}
        </h1>
        <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto italic">
          Discover the art of intentional giving. Each piece is hand-selected and ready to be personalized with your story.
        </p>
      </header>
      
      <div className="lg:hidden mb-8 flex justify-end">
        <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 border border-outline-variant px-6 py-2 rounded-full font-label-caps tracking-widest text-primary hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          <span>COLLECTIONS</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-64 space-y-10 ${isFilterOpen ? 'fixed inset-0 z-50 bg-surface p-6 pt-12 overflow-y-auto w-3/4 max-w-[300px] shadow-2xl transition-transform duration-300 translate-x-0' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center lg:hidden mb-8">
            <h3 className="font-headline text-xl">Filters</h3>
            <button onClick={() => setIsFilterOpen(false)} className="material-symbols-outlined">close</button>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold border-b border-primary/20 pb-2">Collections</h3>
            <div className="space-y-3 font-body text-on-surface-variant">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  className="rounded-none border-outline-variant text-primary focus:ring-primary h-4 w-4" 
                  type="radio" 
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                />
                <span className={`${selectedCategory === 'all' ? 'text-primary font-bold' : 'group-hover:text-primary'} transition-colors`}>All Collections</span>
              </label>
              
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    className="rounded-none border-outline-variant text-primary focus:ring-primary h-4 w-4" 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => handleCategoryChange(cat.id)}
                  />
                  <span className={`${selectedCategory === cat.id ? 'text-primary font-bold' : 'group-hover:text-primary'} transition-colors`}>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id}
                    title={product.name}
                    price={`Rs. ${product.price.toLocaleString()}`}
                    image={product.image}
                    id={product.id}
                    showBuyNow
                  />
                ))}
              </div>
              {products.length === 0 && (
                <div className="py-20 text-center text-outline italic font-body">
                  No products found in this collection.
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-5 py-2 border border-outline-variant rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary hover:border-primary transition-colors"
                  >
                    Prev
                  </button>
                  <span className="text-xs font-bold text-outline">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 border border-outline-variant rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary hover:border-primary transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ShopListing() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 text-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto"></div>
      </div>
    }>
      <ShopListingClient />
    </Suspense>
  );
}
