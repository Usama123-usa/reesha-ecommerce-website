'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/storefront/ProductCard';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [
        { data: catData },
        { data: prodData },
        { data: reviewData }
      ] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*, product_images(image_url)').eq('status', 'Live').limit(4).order('created_at', { ascending: false }),
        supabase.from('reviews').select('*, products(name)').limit(3).order('created_at', { ascending: false })
      ]);

      if (catData) setCategories(catData);
      if (prodData) {
        const mappedProducts = prodData.map(p => ({
          ...p,
          image: p.product_images?.[0]?.image_url || 'https://via.placeholder.com/400x500?text=No+Image'
        }));
        setFeaturedProducts(mappedProducts);
      }
      if (reviewData) setReviews(reviewData);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % categories.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [categories.length]);

  useEffect(() => {
    if (reviews.length > 1 && !isReviewPaused) {
      const timer = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [reviews.length, isReviewPaused]);

  const getTranslateClass = (slideIndex: number) => {
    switch (slideIndex) {
      case 0: return 'translate-x-0';
      case 1: return '-translate-x-[100%]';
      case 2: return '-translate-x-[200%]';
      case 3: return '-translate-x-[300%]';
      case 4: return '-translate-x-[400%]';
      case 5: return '-translate-x-[500%]';
      case 6: return '-translate-x-[600%]';
      default: return 'translate-x-0';
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-margin-mobile md:px-margin-desktop overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-95" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyNmbajqNyIATG-gNkK_n8g-5vWMoWXNMqXRVwRCnuc6csXP776IVU4u44t2sGcYZHTXYwwyHii17irMzHQl1-H7lAfsN59sQ_7VcayKdfFucMUG3dzUDXM38B-NAuKRJ4Pcj87ixz7Eed22QcSl7kpXCyGbRHzEWA_-vN_4xkJLhgJ6p4A7LRYn84crY-Sn58cWyVVEMippe78N83rLyXYsTqsMMIPSij7aSNI4AH46s6ZaARzClM3WWEOo2dIVrW3CpTKq_VBCA"
            alt="Premium Gift Delivery in Islamabad and Rawalpindi - Reesha Gifting"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl w-full overflow-hidden">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-6 block uppercase">Premium Gift Delivery Islamabad</span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-8 leading-tight break-words">Gift Delivery in Islamabad & Rawalpindi</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg italic">
            Looking for the best online gift shop in Pakistan? Reesha offers curated, hand-finished personalized gifts and luxury baskets with same-day delivery in Islamabad and Rawalpindi.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link href="/shop" className="flex w-full sm:w-auto px-6 py-3 bg-primary text-on-primary text-sm md:text-base lg:text-lg items-center justify-center hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
              Shop Now
            </Link>
            <a href="https://wa.me/923165262765" target="_blank" rel="noopener noreferrer" className="flex w-full sm:w-auto px-6 py-3 border border-secondary text-secondary text-sm md:text-base lg:text-lg items-center justify-center gap-2 hover:bg-secondary/5 transition-all">
              <span className="material-symbols-outlined shrink-0">chat</span>
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Categories Slider */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface">Curated for Every Occasion</h2>
        </div>
        
        <div className="relative overflow-hidden group">
          <div 
            className={`flex transition-transform duration-1000 ease-in-out ${getTranslateClass(currentSlide)}`}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div key={cat.id} className="w-full flex-shrink-0 px-4">
                  <div className="relative h-[500px] overflow-hidden rounded-2xl group/card">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover/card:scale-110" 
                      src={cat.image_url || 'https://via.placeholder.com/1200x500?text=' + cat.name} 
                      alt={cat.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                      <h3 className="font-headline-md text-4xl mb-4">{cat.name}</h3>
                      <Link 
                        className="inline-block bg-white text-primary px-8 py-3 rounded-full font-label-caps tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl" 
                        href={`/shop?category=${cat.id}`}
                      >
                        EXPLORE COLLECTION
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-surface-container-low rounded-2xl italic text-outline">
                Loading collections...
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          {categories.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {categories.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/40'}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-label-caps text-primary tracking-widest">ARTISAN PICKS</span>
              <h2 className="font-headline-md text-headline-md mt-2">Treasured Essentials</h2>
            </div>
            <Link className="text-primary font-body-md border-b border-primary/30 pb-1" href="/shop">View All Products</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  title={product.name} 
                  price={`Rs. ${product.price.toLocaleString()}`} 
                  image={product.image}
                  id={product.id}
                />
              ))
            ) : !loading && (
              <div className="col-span-full py-20 text-center text-outline italic">
                Our latest creations are being added. Check back soon!
              </div>
            )}
            {loading && (
              <div className="col-span-full py-20 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-caps text-tertiary tracking-widest block mb-4">VOICES OF JOY</span>
            <h2 className="font-headline-md text-headline-md">Shared Stories</h2>
          </div>
          
          <div 
            className="max-w-4xl mx-auto relative group overflow-hidden w-full"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
          >
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1">
                {reviews.map((review, idx) => {
                  const limit = 140;
                  const commentText = review.comment || "An absolutely wonderful experience from start to finish. The personalization was perfect.";
                  const displayComment = commentText.length > limit ? commentText.substring(0, limit).trim() + "..." : commentText;

                  const rating = review.rating || 0;

                  return (
                    <div 
                      key={review.id} 
                      className={`col-start-1 row-start-1 bg-surface-container-low p-6 md:p-12 rounded-[3rem] flex flex-col justify-between border border-outline-variant/10 shadow-sm transition-all duration-1000 ease-in-out overflow-hidden w-full min-w-0 h-[360px] sm:h-[310px] md:h-[330px] ${idx === currentReviewIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none z-0'}`}
                    >
                      <div className="mb-4 overflow-hidden flex-1">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => {
                            const isFilled = i < rating;
                            return (
                              <span 
                                key={i} 
                                className={`material-symbols-outlined text-sm ${isFilled ? 'text-primary' : 'text-primary/30'}`}
                                style={isFilled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                              >
                                star
                              </span>
                            );
                          })}
                        </div>
                        <span className="material-symbols-outlined text-primary text-5xl opacity-10 mb-2 block">format_quote</span>
                        <p className="font-display-md italic text-on-surface-variant leading-relaxed text-lg md:text-xl break-words overflow-wrap-anywhere min-w-0 w-full">
                          &ldquo;{displayComment}&rdquo;
                        </p>
                      </div>
                      <div className="pt-6 border-t border-outline-variant/20 flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {review.user_name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-title-sm text-primary mb-0.5">{review.user_name}</p>
                          <p className="font-label-caps text-[10px] text-outline tracking-widest uppercase">{review.products?.name || "Verified Purchase"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center text-outline italic">
                Our community is sharing their stories. See them here soon!
              </div>
            )}

            {/* Navigation Dots */}
            {reviews.length > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {reviews.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentReviewIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentReviewIndex ? 'bg-primary w-8' : 'bg-primary/20 w-4'}`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto text-center">
          <span className="font-label-caps text-tertiary tracking-widest mb-4 block uppercase">The Journey</span>
          <h2 className="font-headline-md text-headline-md mb-16">Creating Your Masterpiece</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
              </div>
              <h3 className="font-title-sm mb-4">Select</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Browse our curated collection of premium products and select your canvas.</p>
            </div>
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-outline-variant/30 -z-0"></div>
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
              </div>
              <h3 className="font-title-sm mb-4">Customize</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Add your personal touch with names, dates, or heartfelt messages.</p>
            </div>
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">chat</span>
              </div>
              <h3 className="font-title-sm mb-4">Order via WhatsApp</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Share your vision with us directly for a personalized concierge experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop text-center">
        <div className="glass-panel p-16 rounded-xl max-w-5xl mx-auto shadow-2xl shadow-rose-900/5">
          <h2 className="font-headline-md text-display-lg mb-6">Ready to Create Magic?</h2>
          <p className="font-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto italic">Our artisans are ready to help you craft the perfect gift. Reach out today for a personal consultation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/shop" className="flex w-full sm:w-auto px-6 py-3 bg-primary text-on-primary text-sm md:text-base lg:text-lg items-center justify-center hover:scale-105 transition-all">
              Start Shopping
            </Link>
            <a href="https://wa.me/923165262765" target="_blank" rel="noopener noreferrer" className="flex w-full sm:w-auto px-6 py-3 bg-white border border-rose-200 text-primary text-sm md:text-base lg:text-lg items-center justify-center gap-2 hover:shadow-lg transition-all">
              <span className="material-symbols-outlined shrink-0">forum</span>
              <span>Message Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
