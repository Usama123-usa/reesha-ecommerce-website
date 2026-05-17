'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // Fake Dynamic Data
  const [stock, setStock] = useState(0);
  const [viewers, setViewers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Initialize random values once per session/mount
    setStock(Math.floor(Math.random() * 15) + 5); // 5-20
    setViewers(Math.floor(Math.random() * 7) + 3); // 3-10
    setOrders(Math.floor(Math.random() * 3) + 1); // 1-4

    // Dynamic updates for illusion
    const interval = setInterval(() => {
      setStock(prev => (prev > 3 && Math.random() > 0.7 ? prev - 1 : prev));
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.min(15, Math.max(2, prev + change));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!id) return;
    
    async function fetchProductData() {
      const { data: productData } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single();

      const { data: imageData } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', id);

      if (productData) {
        setProduct(productData);
        if (imageData && imageData.length > 0) {
          const imageUrls = imageData.map((img: any) => img.image_url);
          setImages(imageUrls);
          setActiveImage(imageUrls[0]);
          setCurrentImageIndex(0);
        }
        
        // Fetch reviews for this product
        const { data: reviewData } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', id)
          .order('created_at', { ascending: false });
        if (reviewData) setReviews(reviewData);
      }
      setLoading(false);
    }
    fetchProductData();
  }, [id]);

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const text = `Hello, I want to order:
Product: ${product.name}
Price: Rs. ${product.price.toLocaleString()}
Name: ${name || '[Not provided]'}
Message: ${message || '[Not provided]'}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/923165262765?text=${encodedText}`, '_blank');
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center py-20 font-body">
        <h2 className="text-2xl text-primary">Product not found.</h2>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 lg:gap-y-0">
        
        {/* Category, Title, Price */}
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:pb-8">
          <span className="font-label-caps text-secondary tracking-widest mb-2 block uppercase">
            {product.categories?.name || 'SIGNATURE COLLECTION'}
          </span>
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">{product.name}</h1>
          <div className="flex items-center justify-between mb-6">
            <p className="text-2xl text-primary font-semibold font-body">Rs. {product.price.toLocaleString()}</p>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-error animate-pulse uppercase tracking-tighter">Only {stock} left in stock</span>
              <div className="w-24 h-1 bg-surface-container-high rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-error transition-all duration-1000" style={{ width: `${(stock/20)*100}%` }}></div>
              </div>
            </div>
          </div>

          {/* Activity Messages */}
          <div className="bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl p-4 mb-8 space-y-2">
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>🔥 <b>{viewers} people</b> are viewing this product right now</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">bolt</span>
              <span>⚡ <b>{orders} orders</b> placed in the last hour</span>
            </div>
          </div>
        </div>

        {/* Product Image Gallery */}
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 space-y-6">
          <div className="relative group aspect-[4/5] w-full bg-surface-container-low rounded-xl overflow-hidden shadow-sm shadow-primary/5">
            <img 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300" 
              src={activeImage || 'https://via.placeholder.com/600x800?text=No+Image'}
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-[10px] text-white font-bold tracking-widest">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setActiveImage(img);
                    setCurrentImageIndex(idx);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personalize Section & WhatsApp Order */}
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-2">
          <div className="space-y-6 pt-4 lg:pt-0 lg:border-t lg:border-surface-variant font-body">
            <h2 className="text-xl font-headline text-on-surface">Personalize Your Gift</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Recipient Name</label>
                <input 
                  className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body rounded-t-lg" 
                  placeholder="Who is this for?" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Personalized Message</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body rounded-t-lg" 
                  placeholder="Write a heartfelt note..." 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="pt-8 space-y-4">
            <button 
              onClick={handleWhatsAppOrder}
              className="whatsapp-button w-full flex items-center justify-center space-x-3 py-5 rounded-full text-white font-bold text-lg shadow-lg hover:opacity-90 transition-all"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.591-3.849-1.591-5.946C.153 5.344 5.497 0 12.061 0c3.179 0 6.167 1.238 8.412 3.483 2.246 2.245 3.483 5.234 3.483 8.413 0 6.561-5.343 11.905-11.903 11.905-2.01 0-3.987-.506-5.746-1.465L0 24zm6.12-3.13c1.787.974 3.466 1.488 5.253 1.488 5.539 0 10.05-4.512 10.05-10.051 0-2.686-1.047-5.212-2.948-7.115C16.58 3.289 14.053 2.242 11.366 2.242c-5.54 0-10.051 4.512-10.051 10.051 0 1.944.57 3.824 1.649 5.44l-1.03 3.763 3.882-1.018zM17.387 14.39c-.3-.149-1.778-.878-2.053-.977-.276-.1-.476-.149-.676.15-.2.299-.773.976-.948 1.174-.174.199-.349.224-.648.075-.3-.15-1.266-.467-2.411-1.487-.893-.796-1.495-1.778-1.67-2.077-.174-.3-.018-.462.131-.61.134-.134.3-.349.449-.524.149-.174.199-.299.299-.498.1-.2.05-.374-.025-.524-.075-.15-.676-1.629-.926-2.227-.243-.591-.489-.511-.676-.521-.174-.008-.374-.01-.573-.01-.2 0-.524.075-.798.374-.275.299-1.047 1.022-1.047 2.492 0 1.47 1.071 2.891 1.221 3.09.15.2 2.107 3.217 5.104 4.512.713.308 1.269.491 1.703.629.715.227 1.365.195 1.88.118.574-.085 1.778-.727 2.027-1.428.25-.699.25-1.296.175-1.427-.075-.131-.274-.206-.574-.355z"></path></svg>
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Product Description */}
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-4 mt-8 lg:mt-0 font-body">
          <p className="text-lg text-on-surface-variant leading-relaxed mb-6 italic">
            {product.description || "Every piece in the Reesha collection reflects elegance, emotion, and a personal touch that makes your memories unforgettable."}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-24 border-t border-outline-variant/20 pt-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-headline text-3xl text-on-surface mb-2">Customer Love</h2>
              <p className="text-outline italic text-sm">What people are saying about this piece</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-lg">star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant font-body italic mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {review.user_name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-title-sm text-primary mb-0.5">{review.user_name}</p>
                    <p className="text-[10px] text-outline font-bold uppercase tracking-widest">Verified Collector</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
