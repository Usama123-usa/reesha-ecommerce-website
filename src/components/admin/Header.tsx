"use client";

import { usePathname } from "next/navigation";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const pathname = usePathname();
  
  // Get title from pathname
  const getTitle = () => {
    if (pathname.includes("dashboard")) return "Dashboard Overview";
    if (pathname.includes("products/add")) return "Add New Product";
    if (pathname.includes("categories")) return "Category Management";
    if (pathname.includes("reviews")) return "Customer Reviews";
    if (pathname.includes("settings")) return "Studio Settings";
    return "Admin Studio";
  };

  return (
    <header className="sticky top-0 z-10 glass-panel px-margin-desktop py-6 flex justify-between items-center border-b border-outline-variant/30">
      <div>
        <h2 className="text-2xl md:text-3xl font-headline text-on-surface">{getTitle()}</h2>
        <p className="text-on-surface-variant font-body italic text-sm">Curating emotional stories through gifts.</p>
      </div>
      <div className="flex items-center space-x-4">
        {onSearchChange && (
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-1 focus:ring-primary w-64 transition-all text-on-surface" 
              placeholder="Search products..." 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </header>
  );
}
