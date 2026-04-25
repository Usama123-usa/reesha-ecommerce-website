import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const productName = "The Artisan Keepsake Box";

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const text = `Hello, I want to order:
Product: ${productName}
Name: ${name || '[Not provided]'}
Message: ${message || '[Not provided]'}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/1234567890?text=${encodedText}`, '_blank');
  };

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 lg:gap-y-0">
        
        {/* 1, 2, 3: Category, Title, Price */}
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:pb-8">
          <span className="font-label-caps text-secondary tracking-widest mb-2 block">SIGNATURE COLLECTION</span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">{productName}</h1>
          <p className="text-headline-md text-primary font-semibold">$124.00</p>
        </div>

        {/* 4: Product Image (full width on mobile, left block on desktop) */}
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 space-y-6">
          <div className="aspect-[4/5] w-full bg-surface-container-low rounded-xl overflow-hidden shadow-sm shadow-primary/5">
            <img 
              alt="Premium gift box set" 
              className="w-full h-full object-cover" 
              data-alt="Luxurious open gift box filled with artisan chocolates, a dried flower bouquet, and a silk ribbon on a cream linen surface" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqhL0frpGLEQr-_LnSk42h_SSCmtlHR7gAGZzLHilZb7FAhjYSdOK8RaBOcbdTfwgTQVjlOuR6YuGnr0oP5mPvt5E8h4TkSjwqPwQOLEgwhvNOd0OPdlASp5XAYWEmJIrgsMPDeZzIxe5yqz9ib4TRUGeORmSRbuy1IVGm5hinEqObgQWjY4akd4qB8q7rEXsIpNhwHoWMCgnCSqiAXPcQMKy7kA-nqDiu6Coyqk-SMqwNsyMZbkhq-an0H8QLO8dxDSKc6to0vZs"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                alt="Gift box detail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2akBRZFf0zSBtupn3etG9USj1tMCEdWOldRoH-EtD4nZbsXKvDsSnekYjgzxBmLTVAvmerlxHiMFkgp1ahlkJnh0S__B6LNJTLCWPzop4grqC8td8OuqD9P19E_iTyaZSPystTswe0mnh5zu9KlA5eiLbuzdZoQ_PW4Efvo6oyg9m-rp5xU5YpHWWy-iEeCTkseIi4fEjlbuHXTUxzKeKAKVXYs1PZhFU-nHeu1EvqNA-LG5gLTDMOvX_CjitCNN0WteXF9ITo14"
              />
            </div>
            <div className="aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                alt="Custom message detail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASTA-efX0evZmVsT6aiOUl5RxhWb868gkLFgpEtOe4vovvQUg-FpQgX9UwyP2nLKm1-OtXcgAG2UlmuA36kh7hlFXF84AKnA9_trqB7t6kE2sjGmItJzHQfgC494tPZOAcJ_7OaMGTuFKl9TDFiY9nVBDrsRnoJ0wBts96aMdyUvucTH28FqN_omqTPvfyfICw7USiis02bylUjo2-CSIKSMVTNv3z36la_OzqZRGTVjjsgi11YTr9qdY8hRo4Db22T_0XBKpbYUo"
              />
            </div>
            <div className="aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                alt="Product context" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrmXdHh1VpFelPxhSCxuWhIe4QfDIBlSSQ1yg4oswT8S5t0gLQo6hmo8Y411WREiMk8X09esQ9P9x0bp5O7GBsLsI3N5ReCe06d0PtEY7al5uOXl7h9VaKnF78w-2bUoYLvKdfYOE3ujfveV-ZPiDxTtGCkORnd-dVmjsl0M3nIwpuUN7L9bzl99rbqPLTO1apV5di46PCGmsj39RbuS3qj7TAMiw9h0zc5jztpIAC2l1twMf0cSwCByFmVi8QXnNrJcE5-8or8R0"
              />
            </div>
          </div>
        </div>

        {/* 5, 6: Personalize Section & WhatsApp Order */}
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-2">
          {/* Customization Section */}
          <div className="space-y-6 pt-4 lg:pt-0 lg:border-t lg:border-surface-variant">
            <h2 className="font-title-sm text-on-surface">Personalize Your Gift</h2>
            <div className="space-y-4">
              <div>
                <label className="font-label-caps text-on-surface-variant mb-2 block">Recipient Name</label>
                <input 
                  className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body-md rounded-t-lg" 
                  placeholder="Who is this for?" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="font-label-caps text-on-surface-variant mb-2 block">Personalized Message</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body-md rounded-t-lg" 
                  placeholder="Write a heartfelt note..." 
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Action Section */}
          <div className="pt-8 space-y-4">
            <button 
              onClick={handleWhatsAppOrder}
              className="whatsapp-button w-full flex items-center justify-center space-x-3 py-5 rounded-full text-white font-bold text-lg shadow-lg"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.591-3.849-1.591-5.946C.153 5.344 5.497 0 12.061 0c3.179 0 6.167 1.238 8.412 3.483 2.246 2.245 3.483 5.234 3.483 8.413 0 6.561-5.343 11.905-11.903 11.905-2.01 0-3.987-.506-5.746-1.465L0 24zm6.12-3.13c1.787.974 3.466 1.488 5.253 1.488 5.539 0 10.05-4.512 10.05-10.051 0-2.686-1.047-5.212-2.948-7.115C16.58 3.289 14.053 2.242 11.366 2.242c-5.54 0-10.051 4.512-10.051 10.051 0 1.944.57 3.824 1.649 5.44l-1.03 3.763 3.882-1.018zM17.387 14.39c-.3-.149-1.778-.878-2.053-.977-.276-.1-.476-.149-.676.15-.2.299-.773.976-.948 1.174-.174.199-.349.224-.648.075-.3-.15-1.266-.467-2.411-1.487-.893-.796-1.495-1.778-1.67-2.077-.174-.3-.018-.462.131-.61.134-.134.3-.349.449-.524.149-.174.199-.299.299-.498.1-.2.05-.374-.025-.524-.075-.15-.676-1.629-.926-2.227-.243-.591-.489-.511-.676-.521-.174-.008-.374-.01-.573-.01-.2 0-.524.075-.798.374-.275.299-1.047 1.022-1.047 2.492 0 1.47 1.071 2.891 1.221 3.09.15.2 2.107 3.217 5.104 4.512.713.308 1.269.491 1.703.629.715.227 1.365.195 1.88.118.574-.085 1.778-.727 2.027-1.428.25-.699.25-1.296.175-1.427-.075-.131-.274-.206-.574-.355z"></path></svg>
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* 7: Product Description */}
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-4 mt-8 lg:mt-0">
          <p className="font-body-lg text-on-surface-variant leading-relaxed mb-4">
            Crafted with attention to detail and designed to capture meaningful moments, this gift is more than just a product — it’s an experience. Every piece reflects elegance, emotion, and a personal touch that makes your memories unforgettable.
          </p>
          <p className="font-body-lg text-on-surface-variant leading-relaxed mb-6">
            A curated selection of artisanal goods, wrapped in our signature textured linen box and finished with a hand-tied silk ribbon. Every element is chosen to tell a story of care and sophistication.
          </p>
          <ul className="list-disc list-inside font-body-lg text-on-surface-variant space-y-2">
            <li>Premium quality handcrafted materials</li>
            <li>Fully customizable for any occasion</li>
            <li>Perfect for birthdays, anniversaries, and special moments</li>
            <li>Elegant packaging with luxury finishing</li>
            <li>Designed to create lasting memories</li>
          </ul>
        </div>
      </div>
      
      {/* Secondary Section: Gift Details */}
      <section className="mt-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
        <div className="order-2 md:order-1">
          <h2 className="font-display-lg text-headline-md mb-6">Designed for Unforgettable Moments</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary" data-icon="brush">brush</span>
              </div>
              <div>
                <h4 className="font-title-sm text-on-surface">Handcrafted Presentation</h4>
                <p className="font-body-md text-on-surface-variant">Each box is hand-assembled by our artisans, ensuring perfection in every fold and knot.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary" data-icon="eco">eco</span>
              </div>
              <div>
                <h4 className="font-title-sm text-on-surface">Sustainable Luxury</h4>
                <p className="font-body-md text-on-surface-variant">We use high-quality, recyclable materials and ethically sourced goods from local creators.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 rounded-xl overflow-hidden aspect-video">
          <img 
            alt="Artisan at work" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjmgmS2gWOFD9EtDsjg80TT6LB99jhFkn2bitiGy9RnHJ-C5aIl4yKv8q_xUnegCzUSgA_FOVxrNx4ldkoewne3ewJLoaYTWd50forM-W77Q1jwWayru3ugFLwCMuSV80FBrCQe7bouLvsk6cVUHd7UC_FqKqgozRpKbqQumFc7bP6Ks0ePFxw50i3fEwKPNUSic5hXHVgpHFm3fPKTHbysemO-0oIdH_KCKqhQ-96ytsjuRGijqOx7lNd4BFIX2SW6LfCjz6nFH4"
          />
        </div>
      </section>
    </main>
  );
}
