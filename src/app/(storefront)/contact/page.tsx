'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    try {
      setStatus({ type: 'loading', message: '' });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-4 italic">Gift Shop in Islamabad & Rawalpindi | Contact Reesha</h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
          Looking for premium gift delivery in Islamabad? Contact our concierge team for personalized gift consultations, customized gift baskets, and same-day delivery across Rawalpindi and Pakistan.
        </p>
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
            <a className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-on-primary-fixed-variant transition-all transform hover:-translate-y-1" href="https://wa.me/923165262765" target="_blank" rel="noopener noreferrer">
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
                Islamabad, Pakistan
              </p>
            </div>
            {/* Socials */}
            <div className="glass-panel p-6 rounded-xl border-outline-variant/30 flex flex-col">
              <span className="material-symbols-outlined text-primary mb-3">share</span>
              <h4 className="font-title-sm text-title-sm mb-4">Follow Our Journey</h4>
              <div className="flex flex-col space-y-2">
                <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="https://www.instagram.com/aura_gallery111?igsh=aHFobjg5ZGg5b3dy" target="_blank" rel="noopener noreferrer">
                  <span className="text-sm font-label-caps uppercase tracking-widest">Instagram</span>
                </a>
                <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="https://www.tiktok.com/@aura_gallery111?_r=1&_t=ZS-96EsiXU469k" target="_blank" rel="noopener noreferrer">
                  <span className="text-sm font-label-caps uppercase tracking-widest">TikTok</span>
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
            <form className="space-y-8" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`p-4 rounded-lg ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {status.message}
                </div>
              )}
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">FULL NAME</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all" 
                  placeholder="Your name" 
                  type="text" 
                />
              </div>
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">EMAIL ADDRESS</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all" 
                  placeholder="your@email.com" 
                  type="email" 
                />
              </div>
              <div>
                <label className="block font-label-caps text-on-secondary-fixed-variant mb-2">YOUR MESSAGE</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-body-lg placeholder-stone-400 transition-all resize-none" 
                  placeholder="How can we help you create something special?" 
                  rows={5}
                ></textarea>
              </div>
              <div className="pt-4">
                <button 
                  disabled={status.type === 'loading'}
                  className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-lg shadow-primary/20 disabled:opacity-70" 
                  type="submit"
                >
                  {status.type === 'loading' ? 'Sending...' : 'Send Inquiry'}
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
