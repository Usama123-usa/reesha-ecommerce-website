// Login page has no sidebar or auth guard — it renders standalone
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
