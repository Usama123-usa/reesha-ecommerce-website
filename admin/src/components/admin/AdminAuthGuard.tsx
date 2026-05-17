"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();

      // No session → middleware should have already redirected, but guard as fallback
      if (!session) {
        router.replace("/admin/login");
        return;
      }

      // Verify admin role in database
      const { data: adminRecord, error: adminError } = await supabase
        .from('admins')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (adminError || !adminRecord || adminRecord.role !== 'admin') {
        await supabase.auth.signOut();
        router.replace("/admin/login?error=unauthorized");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-primary italic font-body">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
