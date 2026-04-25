import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = [
    {
      title: 'The Heirloom Suite',
      price: '$245.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCur658REsBefcgYKUHPJnyOp2F4ofpNiO7VaDiUid1nmKwqiXH6fQqpMg4aAPoH-LZtr5bEBnLw8w-Gde6oNY1qU3lRRdSSsZxfkSJ1lI2EEzncZ5eJzbIcdYwO3gKIdmKF09C0uWQ4_3ZAOhx64OViXMt_cdFIpKwLYJRayhg-UmogNeZ2XK-IBA_r95NR41os5pOJBnpuY7JTN-mLe4pUKW-MHZJyyJ4Tkpl3o87POuXU_hprqYK1OquPva1-OMmEnke9k8NiJc',
      id: 'the-heirloom-suite'
    },
    {
      title: 'Midnight Reflection Kit',
      price: '$118.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzfqfjoXa9YUe4Oul3_Wdvpy9wZjBfM1TfijfbtPR59JyKsRJWuk6nny3AgY-vIy8rTRhvH9fejtr95ARpIH5_6MkWEedZRUkR8Em553Vag2kL59oMYjg9_SMzFlIqaTj1gqWaB6fvFcgrzU0_ifyx8FAgIYGnw9e3Ve90S-Ceu8utU5wiEnH_-sqjMdZ3DnqwJw8mvUm40obI40OlY50uf4Q0Lj8piWTgBWftkH6yXHYPpKJx_Fowh-prWQ9eafOcJ1hzacFNc5s',
      id: 'midnight-reflection-kit'
    },
    {
      title: 'Veranda Tea Morning',
      price: '$185.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnlSY36hgh_u7v8M5-04DmazZC_g2E2RfexiZ_kkQzAHOcBWnjdx_avD7jPDJHvM1eTZsqKrxAmVvVQ51K_sea1lhB4AnHgEDpXVgGYvc4Uw2iEZV_slMmV2bS63WjbFaqR5MwDS5KywDHL0Z8rZUEcalTrAVnCiy5eMjXKm5jeu7DWty9Cg4QRhx96OiML2g1cK-xzu3y-sUkOR6kD8zvTbbTTzw-CaiWcPYvxsHSD56de5xAbwrh1MgM1GZy86larjFwr_clfuo',
      id: 'veranda-tea-morning'
    },
    {
      title: 'Custom Leather Memoir',
      price: '$95.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzllmFgmvK91evGxBNLyOZXaZ3BZMQphblhlmEL0GT_hP0ecMo9VZtHFg6qmiN3QHEL_spXcrTiF8TMueC8xXeBJaU9qFFSGMIYxJuHMOy3y36hO45ap3Fqr9dSHoUhDHYp3RA4zhp-KDl9lIb0F9UD9i1vTxm4GjHYHxx4aUGhgSU8r4qYX8JOul8RUmqR5_yP0LL6QhX5dZqMsGVsNaNtkhRa7TgqHm_XHz00ODYJ1Zoam3rmNhFci0SPdAXrRWq3euNtpSP7yU',
      id: 'custom-leather-memoir'
    },
    {
      title: 'Epicurean Welcome',
      price: '$320.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-z6iXY1OjjKav-jBw0nEWa9bh12c3_QuCT7kDpMDjLSHQ5O1dw4P15Xpam0FMq3mP8eGxnwufGZukztJtcW39kf41QIC1sVqP3wrIqeqN7Hxhzwu6H1hFDDXUpZ55DtqkpLNV9xNoMvsOl5j2ENNHnr2wOEwJLGihsTVVn05kSnAR05xvZ6_wfy1hTBDBBawmLm7JaTdfBQAyNf3u_uvXE35UpjMJkv-AGvzsXwm63lH_0sNV2bF333JRtg1T0fpF-OD7d-DAVcg',
      id: 'epicurean-welcome'
    },
    {
      title: 'Serenity Ritual Set',
      price: '$145.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_LatdAEQL1jdSC-T_5T7nW4H7NNgb_wAYiMW-H1m7ssiWVjUCYyPqmZfTVJn9BfMwGePOXQ6n9-NFJ-fXoSsb57Wvi9ZH3F81-vZ6HD8on7ISbmPhoXljvYSR0odgbevdam9BIu0i1XY-7DsX8yiW8zw6mGYSIHGwTe-Hx-tnObCyuw1ol95wW1hwi6F4w8U49CJ75bwkSrS09KT6J2gTn03rzqcBdALtrf8pkcy1Mi6B2sfLqKAGyclcUXK6lWneys0qq0Uqvx8',
      id: 'serenity-ritual-set'
    }
  ];

  return (
    <main className="pt-32 pb-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Curated Gift Collections</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic">
          Discover the art of intentional giving. Each piece is hand-selected and ready to be personalized with your story.
        </p>
      </header>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-8 flex justify-end">
        <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 border border-outline-variant px-6 py-2 rounded-full font-label-caps tracking-widest text-primary transition-colors hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          <span>FILTERS</span>
        </button>
      </div>

      {/* Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Filters Sidebar */}
        <aside className={`w-full lg:w-64 space-y-10 ${isFilterOpen ? 'fixed inset-0 z-50 bg-surface-container-lowest p-6 pt-12 overflow-y-auto w-3/4 max-w-[300px] shadow-2xl transition-transform duration-300 translate-x-0' : 'hidden lg:block'}`}>
          {isFilterOpen && (
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h2 className="font-headline-md text-primary">Filters</h2>
              <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none" onClick={() => setIsFilterOpen(false)}>
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>
          )}
          
          <div className="space-y-6">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Category</h3>
            <div className="space-y-3 font-body-md text-on-surface-variant">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Curated Sets</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input defaultChecked className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Home Accents</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Handwritten Notes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Luxe Stationery</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Occasion</h3>
            <div className="space-y-3 font-body-md text-on-surface-variant">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Anniversary</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Housewarming</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="rounded-none border-outline-variant text-primary focus:ring-primary-container h-4 w-4" type="checkbox" />
                <span className="group-hover:text-primary transition-colors">Corporate Gifting</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Price Range</h3>
            <div className="px-2">
              <input className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
              <div className="flex justify-between mt-2 font-label-caps text-on-surface-variant">
                <span>$50</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)}></div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, idx) => (
              <ProductCard 
                key={idx}
                title={product.title}
                price={product.price}
                image={product.image}
                id={product.id}
                showQuickView
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-24 w-full overflow-x-auto">
            <div className="flex justify-center items-center gap-4 sm:gap-8 min-w-max mx-auto px-4 pb-2">
              <button className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-low text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined text-sm sm:text-base">chevron_left</span>
              </button>
              <div className="flex items-center gap-4 sm:gap-6 font-serif">
                <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-on-primary transition-all shadow-sm">1</button>
                <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all">2</button>
                <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all">3</button>
              </div>
              <button className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-low text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined text-sm sm:text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
