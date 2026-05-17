// Middleware (middleware.ts) handles all server-side route protection for /admin/*.
// No client-side guard needed here — pages load directly after middleware allows them.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
