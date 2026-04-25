export default function Contact() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-4 italic">Let’s Start a Conversation</h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">Whether it's a question about a bespoke gift or a note of appreciation, we are here to help you tell your story.</p>
      </section>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Details & Direct Actions (Left Column) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* WhatsApp Prominent Card */}
          <div className="glass-panel p-8 rounded-xl soft-glow-shadow bg-secondary-container/30 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-3xl text-primary">chat</span>
            </div>
            <h3 className="font-title-sm text-title-sm text-primary">Instant Assistance</h3>
            <p className="font-body-md text-body-md text-secondary">Prefer a quick chat? Our concierge team is available on WhatsApp to assist with your gifting needs.</p>
            <a className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-on-primary-fixed-variant transition-all transform hover:-translate-y-1" href="https://wa.me/yourwhatsappnumber">
              Chat on WhatsApp
            </a>
          </div>
          
          {/* Location & Socials Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="glass-panel p-6 rounded-xl border-outline-variant/30">
              <span className="material-symbols-outlined text-primary mb-3">location_on</span>
              <h4 className="font-title-sm text-title-sm mb-2">Our Studio</h4>
              <p className="text-body-md text-secondary leading-relaxed">
                Avenue de la Toison d'Or 12<br />
                1000 Brussels, Belgium
              </p>
            </div>
            {/* Socials */}
            <div className="glass-panel p-6 rounded-xl border-outline-variant/30 flex flex-col">
              <span className="material-symbols-outlined text-primary mb-3">share</span>
              <h4 className="font-title-sm text-title-sm mb-4">Follow Our Journey</h4>
              <div className="flex flex-col space-y-2">
                <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="#">
                  <span className="text-sm font-label-caps uppercase tracking-widest">Instagram</span>
                </a>
                <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="#">
                  <span className="text-sm font-label-caps uppercase tracking-widest">Pinterest</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative Image */}
          <div className="relative h-64 rounded-xl overflow-hidden soft-glow-shadow">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDizsaZlguYLpeC2veu0q4_6zFzTmb0pd0oDNujbdIXbljU7gnCeVi7oHmpKrj9pbx1aCww8VISvfjW7rLJ54cZzHVWmJ21fVROb6jwy5HYYXEqD3kB0cISRZaEd5pRfkxLo0GPaXGHsybxLKXyXb1UcftJuRq69HaCCTeDi846401GSIIi8iZQcbQJIC6UmNeJusumnqy5bXl7AOVjVMRCt6GUnqqsdKGOilg30H46jyfgRUtY3E0QmS8MBgxQNl8kh8Otpei-dUo"
              alt="Artisan stationery"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
        
        {/* Contact Form (Right Column) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-10 md:p-12 rounded-xl soft-glow-shadow h-full">
            <form className="space-y-8">
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">FULL NAME</label>
                <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all" placeholder="Your name" type="text" />
              </div>
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">EMAIL ADDRESS</label>
                <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all" placeholder="your@email.com" type="email" />
              </div>
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">YOUR MESSAGE</label>
                <textarea className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all resize-none" placeholder="How can we help you create something special?" rows="5"></textarea>
              </div>
              <div className="pt-4">
                <button className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-lg shadow-primary/20" type="submit">
                  Send Inquiry
                </button>
              </div>
            </form>
            <div className="mt-12 flex items-center gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary" data-weight="fill">verified</span>
              <p className="text-sm italic text-secondary">Our concierge team typically responds within 4 working hours.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
