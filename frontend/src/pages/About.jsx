export default function About() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-6 md:pt-10 pb-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2">
          <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase block mb-2 md:mb-3">Our Philosophy</span>
          <h1 className="text-display-lg font-display-lg text-on-surface leading-tight mt-3 md:mt-4">
            Gifts that <span className="italic font-normal text-primary">tell a story</span>.
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg leading-relaxed mt-3 md:mt-4">
            At Reesha, we believe that the most meaningful gifts aren't just objects; they are vessels for memories, emotions, and unspoken words.
          </p>
          <div className="pt-4 mt-4">
            <button className="bg-primary text-on-primary px-10 py-4 font-body-md rounded-DEFAULT hover:shadow-lg transition-all transform hover:-translate-y-1">
              Explore the Collection
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative mt-6 md:mt-10 flex justify-center items-center">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="relative rounded-2xl overflow-hidden hero-shadow aspect-[4/5]">
            <img 
              className="w-full h-full object-cover" 
              data-alt="Elegant close-up of a hand-wrapped gift box with a delicate silk ribbon and a small sprig of dried lavender on cream paper" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCCt03BCod0_lUA1TcQIxwMFLpsH2uC-y1sgLx3g_zbhxEw7Z52hYJWjmfWipKC72FXqKMF-0RwGLPqptZwYZ8VuD69-JUbSOtCudfIMexNfV4DAdbVkwgn7rVSfOso8zs0wbL4I1LSn_aiSTfoSu2LF1h2WvqtrYmGwQWaeg3Hul8jW0V81NHnr8eMTHdRx0Kh2E4l8g52Znnmkw9VRfQjOT1GSOVGBINjyQDfuie-DEVl6octbc7hy2dc59qqTUItsORMD54HPY"
              alt="Gift box"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-xl hidden lg:block max-w-xs">
            <p className="font-body-md italic text-primary leading-snug">"The wrapping is the first chapter of the story you're about to tell."</p>
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="bg-surface-container-low py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <h2 className="text-headline-md font-headline-md text-on-surface">Our Mission</h2>
            <div className="w-24 h-px bg-primary mx-auto"></div>
            <p className="text-display-lg font-display-lg italic leading-relaxed text-secondary">
              "To nurture human connections through the art of thoughtful curation and artisanal craftsmanship."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">favorite</span>
              <h3 className="text-title-sm font-title-sm text-on-surface">Deeply Personal</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">Every item is chosen with the intention of creating a specific emotional resonance for the receiver.</p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">draw</span>
              <h3 className="text-title-sm font-title-sm text-on-surface">Artisan Built</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">We partner with local craftspeople who pour their heart and soul into every stitch, pour, and carve.</p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">eco</span>
              <h3 className="text-title-sm font-title-sm text-on-surface">Sustainably Minded</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">Luxury doesn't have to be loud. Our materials are sourced with respect for the earth that inspired them.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Craftsmanship (Bento-style Grid) */}
      <section className="max-w-7xl mx-auto px-8 py-12 md:py-20">
        <div className="mb-12">
          <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase">The Process</span>
          <h2 className="text-headline-md font-headline-md mt-4">Crafted with Quiet Intention</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto items-center">
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group aspect-video">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              data-alt="Hands of an artisan carefully arranging dried flowers and delicate jewelry inside a wooden gift box in a sun-drenched studio" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyAH2jlTrqv03UlDrP7ICKCrJMvez17bKYjp4f5sip4AQnJgHGbpgclrnuaHejjs-9cg79FGprE3fCfxYZnaWm17xy4iU6KKwgR2ppwDlYvegzDOZzPMJbELCtY9grTPTHsnuiF3VEQscO8bjSDGveRpV2v5oNWrxiFKRKXq0h2TqIVOZeTFuiQQDxfyNqOMDd-1llG2h652Y7_BxS5L-FGldebQLKTvAbdn2e-VQFGlgEIxRp8qW5B7usgl5zuyrvVgacC_2c2E4"
              alt="Artisan"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-on-primary font-body-lg">The Art of Curation</p>
            </div>
          </div>
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden group aspect-square">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYOaLlpNS1GyMTFYvIXBAnQ_0htA3V-_4JJKzwM1RdKyEZejFF8LZOE7mWzV3z6pISX9N6Vaw4pyXxW81LRBhCynKuHpaKKUcsMUltcpfb3Gyyk5RInfZUZx1CJ3uim2h5oWbpoYN4CecPW6eZO5UStsnTb57WD-tYlLyEvMM9gRvdBuIRyswO-2iHq0TBT9_-eLi_KcKbBRroRvCg2q6rhzNkJl6V4kBUde0ZCk5eZIUiBqxTXHHUqXa-kSeBbRiulxYIINqFvQ0"
              alt="Writing note"
            />
          </div>
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden group aspect-square">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-5spTGPHpILmWc7Bk8te04XNazISXgZIjySWaVmPQLfFjrzw1frjXITpGr7yEk6RajXOoXanzhZEEYsaf6_emlzvG1EoNef3robw-Zof5GaZSvPecyECC78iF7ptCzUKx0D0DbIXucrZeboT8Z9L9oIYB004oAqgw388ysFWrPahD3m4wFqsh-8wBWaTaXGMUecyWo-bNwyjX0X8Pvc95oIbz-Spr2qbfCklPrTDNgvH8cntMjOuLAUs__2OuKKn157YoSWxJUeU"
              alt="Wrapping"
            />
          </div>
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group aspect-video">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAh2HJpw8BZCnO_3Cz66VllyhMxjkjImeZjj1GBF_CfGLjayGZcCX4jGQ6I92fIJsOYPFkd3iuVnRjGODayLGLbAbn9TnsFFf5dLpS237miv_sNDstSARr7dCJgp1DS1qKj81bY_8EUernAx4J4sQolB77hZOd4J9CE2r88FjhpzccmgfXTVepP7yRU1x0dm2g2W8t5oK34WbNX7khnogfnDMZjLfZL1-lLA-EvWsw-FG9w_PxtwlYHyG4Jb-IGbhNiX5XZ34gDJY"
              alt="Boutique interior"
            />
          </div>
        </div>
      </section>
      
      {/* Emotional Quote */}
      <section className="py-20 bg-surface-container-highest">
        <div className="max-w-4xl mx-auto px-8 text-center italic">
          <p className="text-headline-md font-headline-md text-primary leading-relaxed">
            "When words aren't enough, we find the objects that speak. We don't just sell gifts; we bridge the gap between people."
          </p>
          <p className="mt-8 font-body-md text-on-surface-variant font-bold uppercase tracking-widest">— The Reesha Atelier</p>
        </div>
      </section>
      
      {/* Newsletter / Contact CTA */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-primary-container rounded-2xl p-12 md:p-24 flex flex-col items-center text-center">
          <h2 className="text-headline-md font-headline-md text-on-primary-container">Be Part of the Story</h2>
          <p className="text-body-lg font-body-lg text-on-primary-container/80 mt-4 max-w-xl">
            Subscribe to our occasional letters on the art of living, giving, and connecting. No noise, just inspiration.
          </p>
          <form className="mt-12 flex flex-col sm:flex-row w-full max-w-md gap-4">
            <input className="flex-1 bg-white/50 border-0 focus:ring-2 focus:ring-primary rounded-DEFAULT px-6 py-4" placeholder="Your email address" type="email" />
            <button className="bg-primary text-on-primary px-8 py-4 font-body-md rounded-DEFAULT hover:opacity-90 transition-opacity">
              Join Us
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
