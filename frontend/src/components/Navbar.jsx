import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const baseClass = "font-serif tracking-wide transition-colors";
  const activeClass = "text-rose-900 dark:text-rose-100 border-b border-rose-900 dark:border-rose-100 pb-1 " + baseClass;
  const inactiveClass = "text-stone-600 dark:text-stone-400 hover:text-rose-800 " + baseClass;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-rose-100/20 dark:border-white/10 shadow-sm shadow-rose-900/5">
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-serif italic text-rose-950 dark:text-rose-100 tracking-wide">
          Reesha
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-y-0 space-x-8">
          <Link to="/" className={isActive('/') ? activeClass : inactiveClass}>Home</Link>
          <Link to="/shop" className={isActive('/shop') ? activeClass : inactiveClass}>Shop</Link>
          <Link to="/about" className={isActive('/about') ? activeClass : inactiveClass}>About</Link>
          <Link to="/contact" className={isActive('/contact') ? activeClass : inactiveClass}>Contact</Link>
        </div>
        
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-600 dark:text-stone-400 hover:text-rose-800 focus:outline-none">
            <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border-t border-rose-100/20 dark:border-white/10 absolute w-full left-0 shadow-lg z-50">
          <div className="flex flex-col items-center py-6 space-y-6">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={isActive('/') ? activeClass : inactiveClass}>Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop" className={isActive('/shop') ? activeClass : inactiveClass}>Shop</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className={isActive('/about') ? activeClass : inactiveClass}>About</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className={isActive('/contact') ? activeClass : inactiveClass}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
