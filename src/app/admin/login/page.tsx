"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle unauthorized redirect from middleware
  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setError("Your account does not have admin privileges.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Attempting sign in...");
      // 1. Attempt Auth Login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Auth error:", authError.message);
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Login failed. No user data returned.");
        setLoading(false);
        return;
      }

      console.log("Auth success for:", data.user.email);
      console.log("Verifying admin role in database...");

      // 2. Check if user exists in the admins table
      // We use a timeout or limit to ensure it doesn't hang forever
      const { data: adminRecord, error: adminError } = await supabase
        .from('admins')
        .select('role')
        .eq('id', data.user.id) // Use ID for better performance
        .single();

      if (adminError || !adminRecord || adminRecord.role !== 'admin') {
        console.error("Admin verification failed:", adminError?.message || "User record not found in 'admins' table");
        setError("Access denied. You are not registered as an administrator.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      console.log("Verification successful. Redirecting...");
      
      // Force a refresh to ensure cookies are sent to the middleware
      router.refresh();
      
      // Delay slightly to ensure cookie persistence before redirect
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 300);

    } catch (err: any) {
      console.error("Critical login error:", err);
      
      let errorMessage = "A critical error occurred. Please check your connection and try again.";
      
      if (err.message === "Failed to fetch") {
        errorMessage = "Connection Failed: Could not reach Supabase. Please verify your NEXT_PUBLIC_SUPABASE_URL in .env.local and ensure the project is not paused.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl custom-shadow space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-headline italic text-primary">Reesha</h1>
          <p className="text-[10px] font-body uppercase tracking-widest text-outline mt-2">
            Admin Studio Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-body uppercase tracking-widest text-outline">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all text-on-surface"
              placeholder="admin@reesha.com"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-body uppercase tracking-widest text-outline">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all text-on-surface"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-error-container/20 border border-error/20 rounded-lg">
              <p className="text-error text-xs font-body italic text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-body font-bold uppercase tracking-widest hover:bg-primary/90 transition-all custom-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying Credentials...
              </span>
            ) : (
              "Login to Studio"
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-outline uppercase tracking-[0.2em]">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface text-primary italic">Loading Login...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
