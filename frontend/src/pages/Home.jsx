import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-95" 
            data-alt="Soft ethereal close-up of a person tying a delicate silk ribbon on a cream colored gift box with warm morning sunlight" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyNmbajqNyIATG-gNkK_n8g-5vWMoWXNMqXRVwRCnuc6csXP776IVU4u44t2sGcYZHTXYwwyHii17irMzHQl1-H7lAfsN59sQ_7VcayKdfFucMUG3dzUDXM38B-NAuKRJ4Pcj87ixz7Eed22QcSl7kpXCyGbRHzEWA_-vN_4xkJLhgJ6p4A7LRYn84crY-Sn58cWyVVEMippe78N83rLyXYsTqsMMIPSij7aSNI4AH46s6ZaARzClM3WWEOo2dIVrW3CpTKq_VBCA"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-6 block">ARTISAN GIFTING</span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-8 leading-tight">Make Every Gift Personal</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg italic">
            Transforming moments into memories with curated, hand-finished gifts designed to tell your unique story.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link to="/shop" className="flex w-full sm:w-auto px-6 py-3 bg-primary text-on-primary text-sm md:text-base lg:text-lg items-center justify-center hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
              Shop Now
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex w-full sm:w-auto px-6 py-3 border border-secondary text-secondary text-sm md:text-base lg:text-lg items-center justify-center gap-2 hover:bg-secondary/5 transition-all">
              <span className="material-symbols-outlined shrink-0" data-icon="chat">chat</span>
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface">Curated for Every Occasion</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Birthday */}
          <div className="group relative h-[400px] overflow-hidden cursor-pointer">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              data-alt="Elegant birthday celebration" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB56-_aT4Fkd8NsPTx5rhz-ExV-dg5KGJa6faqvKDkiSZi19-IOAttbyIJXzVykHzj-UfPf7gmfPCb3HTRrJvyQcKQ0_57iknygNL30jeH85cwtANtRLC_3sVQoRaDwNBMwcNRrgZ1USQB1ucSmDhmA56uElZQj8vbp0FbEXK7LKmhrOIWnpxtBCoeiDeyBPhDwzNIMgkDydG2tMdLNvCvuUfvuEzXs6BHslBz2JKFrrDwWjNJiKWKarwhF7TQLBr7nrc5mYocnkYA" 
              alt="Birthday"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline-md text-white mb-2">Birthday</h3>
              <Link className="text-white font-label-caps tracking-widest border-b border-white/50 pb-1" to="/shop">EXPLORE COLLECTION</Link>
            </div>
          </div>

          {/* Anniversary */}
          <div className="group relative h-[400px] overflow-hidden cursor-pointer">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_-PkgYCX4hwl9O0vCvQK6AFzyJ497UagpY1ahK5ayjE1e7yjxxz_wcTDgloSZI7nUH5k8QIgY1cM3OYs4Cwr9OtL9tUtjdzVcIkoS3dxfoKK-ATDHCxAvblMDu3Pkmmd-dQbTD0IILC2CehR05xhVU8UZp_eXwyosjjUaSP79X-RevL_07YVa_moC5ac6TU7c5gJzMUyJz3xQYHHIdceszVdaRJlKDi_3r8gOIuttkPpMoDnNmrYZ4_MhGgbKrLVCTPWJkJz_6r8" 
              alt="Anniversary"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline-md text-white mb-2">Anniversary</h3>
              <Link className="text-white font-label-caps tracking-widest border-b border-white/50 pb-1" to="/shop">EXPLORE COLLECTION</Link>
            </div>
          </div>

          {/* Couple Gifts */}
          <div className="group relative h-[400px] overflow-hidden cursor-pointer">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5VnZsRAl7zYA54MmL5FXUtZsW2rACx4oUzfXOarEpSzEUdLj7ukCXkH09DY3vMtOapTwOIitEL3tq8-I1IY0xZ6byvwdXhSKWjZU4ID-hAdHqEPvxN7dapvMNo8Iharvcs8FJoWCscQEGiH2QEx1cWVvgZbjRRlhnxVKGh2igwIleTaeUGeHglHU1pPWyzTnnimm71y3-K16NgEZsJD63C8klv3lmbml68UcgxygFx57vbMulVa9NKXseNl_dlyiae8Isvja84f4" 
              alt="Couple Gifts"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline-md text-white mb-2">Couple Gifts</h3>
              <Link className="text-white font-label-caps tracking-widest border-b border-white/50 pb-1" to="/shop">EXPLORE COLLECTION</Link>
            </div>
          </div>
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
            <Link className="text-primary font-body-md border-b border-primary/30 pb-1" to="/shop">View All Products</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard 
              title="Signature Journal" 
              price="$45.00" 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAEdBGly5IB9KRQSD0T4g_nqQuZ0mBi1tUfhf1NnG-5af7Dk7ntuDCx95xPCGTCxCs6AqgBub0S_schJkqFV42_ZkebEfuKLvWzaE5UhFBBf860OsEiZt20yzOmrqvauPJ1yyEuq4rAdgHeBarYZIN7Zbz3U299bdU-eKF9qZGy66OBQwRYFyE000SzkyLRRwXlEKD7YANhNjcP0Vb4nvBIjnvSg63WMKApdYwKoSXIpusux8uXQNWa8yd2dEdzAIgDtfClJOUBYhU"
            />
            <ProductCard 
              title="Botanical Ceramic Mug" 
              price="$28.00" 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBAV3Wo_dIagOhfxgM1A8Yyn9L6shnn3OTpgeI2yBqn2oqPf0nKqGV2g5ICyzEQEdMouTETfdk6jJetH1ZAFyKOH-Y4-bIm6dAv-pVASvBvAJVOxftbRrHWBQ-htHqTfVilhYQpKpg84IzIpj8WHJsQdwtMgbnyqqHvcSju716IZC7cg0R94BwSVJQlPqhd0hgEDQkBfXgauYiN09v7fj-BeLk-EAvjFoO--pcdeKRdZGnB4YCC39URaTpAVgio0SsUATXTCNHZ4S4"
            />
            <ProductCard 
              title="Ethereal Frame" 
              price="$52.00" 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBTC3AvbxmSVaJt6BEYtQGutd99B4z1RjnbQ7wEAZRxqyKXwOEpaozfP8XmxCAhqbZ0eKLDbNyMaFBezR1Uc_zG63x9oNkTEQdLYN2KAx2rEhrjq54f16r7Ivx3OXSPENjwc4WPhMxS3YHrCvnzN2hu0-64TAyayd9q7ncPnvCVp28Y6JP6-o94WZcuhry3BBVdHAJsQo_8KB-F8EGTmgLuE6cNqav5DpC0-pjG9NsT9kpwDKlrmlVz8TuhBfpMm2_4Pxv8TDe4tBM"
            />
            <ProductCard 
              title="Occasion Card Set" 
              price="$35.00" 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBYV7eBQhX55bRqeZIl2DFaFacQz99z3Jx8kGnmFA5wO00GHzYftf6caZGl8vnS7-zPBgk472V0KxaDlIWp81JbMgHxFPaK1RHKmWEPvZH6WmLTadwvAGfrr9MErUQnI44JXZp5Cz5Y3TH8Zl67mRcD3x00OvOxux9-xS6miENLiNLL3ZcHxJdXFqobPSRjcWy_rAVXJH3FdWvEuG1fOqYJY-2ltOWCvn3hoX8Y5eD-4MHEzVT9daXy6z-OfXbtPmxtN0ygt5IR_YM"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <span className="font-label-caps text-tertiary tracking-widest mb-4 block uppercase">The Journey</span>
          <h2 className="font-headline-md text-headline-md mb-16">Creating Your Masterpiece</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
            
            {/* Step 1 */}
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="inventory_2">inventory_2</span>
              </div>
              <h3 className="font-title-sm mb-4">Select</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Browse our curated collection of premium products and select your canvas.</p>
            </div>
            
            {/* Decorative Line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-outline-variant/30 -z-0"></div>
            
            {/* Step 2 */}
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="auto_fix_high">auto_fix_high</span>
              </div>
              <h3 className="font-title-sm mb-4">Customize</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Add your personal touch with names, dates, or heartfelt messages.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 text-center relative z-10 group">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="chat">chat</span>
              </div>
              <h3 className="font-title-sm mb-4">Order via WhatsApp</h3>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto italic">Share your vision with us directly for a personalized concierge experience.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-gap bg-secondary-container px-margin-mobile md:px-margin-desktop relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-primary text-6xl opacity-20 mb-8" data-icon="format_quote">format_quote</span>
          <div className="font-headline-md italic text-on-secondary-container mb-8 leading-relaxed">
            "Reesha turned a simple frame into a family heirloom. The attention to detail and the personal consultation via WhatsApp made the whole process feel so special. Truly emotional luxury."
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0AQdChOz04fbtlOZUomGKAe-3EtkmDoP642tgO3mgbxfybBB_yhgB49mgH8VCLfLZuvgUrNSA15H2E_1bdI99ayeGubE_lU6qasDRiuxGaq33oDjbF6JbNz3jSiUaIpwFHhIiJVno4sDj2ZtwTaGV59hrgIXpVrFwOg9xbrtug-rIFHZp6WvTKiNw-4oNAB70usSnTFYTsDBbPp34TaHw6QxSiZ7fFt6VduuQQh31JB8JtUQEha80JIMn2r0KwtQrqyBp6kFASE" 
                alt="Elena Richardson"
              />
            </div>
            <div className="text-left">
              <p className="font-title-sm text-on-secondary-fixed">Elena Richardson</p>
              <p className="font-label-caps text-on-secondary-fixed-variant opacity-70">LOYAL CUSTOMER</p>
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
            <Link to="/shop" className="flex w-full sm:w-auto px-6 py-3 bg-primary text-on-primary text-sm md:text-base lg:text-lg items-center justify-center hover:scale-105 transition-all">
              Start Shopping
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex w-full sm:w-auto px-6 py-3 bg-white border border-rose-200 text-primary text-sm md:text-base lg:text-lg items-center justify-center gap-2 hover:shadow-lg transition-all">
              <span className="material-symbols-outlined shrink-0" data-icon="forum">forum</span>
              <span>Message Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
