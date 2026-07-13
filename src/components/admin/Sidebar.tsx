"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminSidebar } from "./AdminSidebarContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobileOpen, closeMobileSidebar } = useAdminSidebar();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    setSignOutError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.refresh();
      router.push("/admin/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      setSignOutError("Logout failed. Please try again.");
      setIsSigningOut(false);
    }
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "inventory_2" },
    { name: "Collections", href: "/admin/categories", icon: "category" },
    { name: "Reviews", href: "/admin/reviews", icon: "rate_review" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-outline-variant bg-surface-container-lowest flex flex-col z-50 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
      <div className="p-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-headline italic text-primary">Reesha</h1>
          <p className="text-[10px] font-body uppercase tracking-widest text-outline mt-1">Admin Studio</p>
        </div>
        <button
          onClick={closeMobileSidebar}
          className="material-symbols-outlined text-outline hover:text-error transition-colors md:hidden"
        >
          close
        </button>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileSidebar}
              className={`${
                isActive ? "sidebar-item-active" : "text-on-surface-variant hover:bg-surface-container-low"
              } flex items-center px-4 py-3 rounded-xl transition-all duration-300`}
            >
              <span className="material-symbols-outlined mr-3">{item.icon}</span>
              <span className={`font-body ${isActive ? "font-bold" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-outline-variant">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
            AD
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">Admin User</p>
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={`text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${
                isSigningOut ? "text-primary cursor-wait" : "text-outline hover:text-primary"
              }`}
            >
              {isSigningOut ? (
                <>
                  <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                  Signing out...
                </>
              ) : (
                "Sign Out"
              )}
            </button>
            {signOutError && (
              <p className="text-[10px] text-error mt-1 italic leading-tight">{signOutError}</p>
            )}
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}
