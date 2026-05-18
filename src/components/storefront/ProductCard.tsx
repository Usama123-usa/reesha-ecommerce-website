import Link from 'next/link';

import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  alt?: string;
  id?: string;
  showBuyNow?: boolean;
}

export default function ProductCard({ title, price, image, alt, id, showBuyNow = true }: ProductCardProps) {
  return (
    <div className="group product-card">
      <Link href={`/product/${id || 'default'}`}>
        <div className="relative overflow-hidden aspect-[4/5] bg-surface-container-low mb-6 rounded-2xl">
          <Image 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={image} 
            alt={alt || title} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {showBuyNow && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-4 transition-all duration-300">
               <button className="w-full bg-white/90 backdrop-blur-md py-3 rounded-xl font-label-caps text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
                 Buy Now
               </button>
             </div>
          )}
        </div>
        <div className="text-center space-y-2 px-2">
          <h3 className="font-headline text-lg text-on-surface italic group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
          <p className="font-body text-primary font-bold">{price}</p>
        </div>
      </Link>
    </div>
  );
}
