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
          <a href="#" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">Instagram</a>
          <a href="#" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">Pinterest</a>
          <a href="#" className="text-stone-500 dark:text-stone-500 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-serif text-sm italic">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
