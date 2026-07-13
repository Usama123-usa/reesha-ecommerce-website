"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminSidebarContextValue {
  isMobileOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(null);

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AdminSidebarContext.Provider
      value={{
        isMobileOpen,
        openMobileSidebar: () => setIsMobileOpen(true),
        closeMobileSidebar: () => setIsMobileOpen(false),
        toggleMobileSidebar: () => setIsMobileOpen((v) => !v),
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const ctx = useContext(AdminSidebarContext);
  if (!ctx) {
    throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  }
  return ctx;
}
