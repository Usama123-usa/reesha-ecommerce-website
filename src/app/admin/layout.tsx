// Middleware (middleware.ts) handles all server-side route protection for /admin/*.
// No client-side guard needed here — pages load directly after middleware allows them.
import { AdminSidebarProvider } from "@/components/admin/AdminSidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSidebarProvider>{children}</AdminSidebarProvider>;
}
