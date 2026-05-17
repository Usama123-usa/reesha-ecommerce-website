import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 w-full py-12 px-8 border-t border-rose-100 dark:border-stone-800">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 max-w-7xl mx-auto">
        <div className="text-xl font-serif text-rose-950 dark:text-rose-100">Reesha</div>
        <div className="text-stone-500 dark:text-stone-500 font-serif text-sm italic text-center md:text-left">
          © 2024 Reesha. Every gift tells a story. Crafted with love.
        </div>
        <div className="flex gap-8">
          <a href="https://www.instagram.com/aura_gallery111?igsh=aHFobjg5ZGg5b3dy" target="_blank" rel="noopener noreferrer" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">Instagram</a>
          <a href="https://www.tiktok.com/@aura_gallery111?_r=1&_t=ZS-96EsiXU469k" target="_blank" rel="noopener noreferrer" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">TikTok</a>
          <a href="https://wa.me/923165262765" target="_blank" rel="noopener noreferrer" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
