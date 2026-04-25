import { Link } from 'react-router-dom';

export default function ProductCard({ title, price, image, alt, id, showQuickView }) {
  return (
    <div className="group product-card">
      <Link to={`/product/${id || 'default'}`}>
        <div className="relative overflow-hidden aspect-[4/5] bg-surface-container-low mb-6">
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            data-alt={alt} 
            src={image} 
            alt={alt || title} 
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {showQuickView && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-4 transition-all duration-300 quick-view">
               <button className="w-full glass-panel py-3 font-label-caps text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300">
                 Quick View
               </button>
             </div>
          )}
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-headline-md text-title-sm text-on-surface italic">{title}</h3>
          <p className="font-body-md text-on-surface-variant">{price}</p>
        </div>
      </Link>
    </div>
  );
}
