import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Create an initial response object
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Initialize the server-side Supabase client with request/response cookie sync
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update the cookies on the request so server components get the fresh ones
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          
          // Re-create response with updated request headers
          supabaseResponse = NextResponse.next({
            request,
          });
          
          // Apply cookies to the outgoing response headers for the browser
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Always use getUser() on the server to cryptographically validate the JWT.
  // Never trust getSession() as it can be easily spoofed on the client.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Check route protection for /admin paths (except /admin/login)
  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      console.log(`[Proxy] Unauthorized access to ${pathname}. Redirecting to login.`);
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      
      const redirectResponse = NextResponse.redirect(url);
      // Copy over session sync/clearance cookies to the redirect response
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          path: cookie.path,
          domain: cookie.domain,
          maxAge: cookie.maxAge,
          expires: cookie.expires,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite,
        });
      });
      return redirectResponse;
    }

    // Role Verification: Confirm the user is actually registered in the admins database table.
    try {
      const { data: adminRecord, error: adminError } = await supabase
        .from("admins")
        .select("role")
        .eq("id", user.id)
        .single();

      if (adminError || !adminRecord || adminRecord.role !== "admin") {
        console.warn(`[Proxy] Non-admin user (${user.email}) attempted to access ${pathname}. Signing out.`);
        
        // Log out user on server to clear their session cookies completely
        await supabase.auth.signOut();

        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "unauthorized");

        const redirectResponse = NextResponse.redirect(url);
        // Copy signout/cookie removal headers to the redirect response
        supabaseResponse.cookies.getAll().forEach((cookie) => {
          redirectResponse.cookies.set(cookie.name, cookie.value, {
            path: cookie.path,
            domain: cookie.domain,
            maxAge: cookie.maxAge,
            expires: cookie.expires,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite,
          });
        });
        return redirectResponse;
      }
    } catch (dbError) {
      console.error("[Proxy] Database admin lookup failed:", dbError);
      // Allow request to continue and fallback to Client-Side AdminAuthGuard rather than crashing
    }
  }

  // If the user is authenticated as an admin and tries to visit /admin/login, redirect to dashboard
  if (user && isLoginPage) {
    try {
      const { data: adminRecord } = await supabase
        .from("admins")
        .select("role")
        .eq("id", user.id)
        .single();

      if (adminRecord && adminRecord.role === "admin") {
        console.log(`[Proxy] Logged-in admin visited login page. Redirecting to dashboard.`);
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        
        const redirectResponse = NextResponse.redirect(url);
        supabaseResponse.cookies.getAll().forEach((cookie) => {
          redirectResponse.cookies.set(cookie.name, cookie.value, {
            path: cookie.path,
            domain: cookie.domain,
            maxAge: cookie.maxAge,
            expires: cookie.expires,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite,
          });
        });
        return redirectResponse;
      }
    } catch (e) {}
  }

  return supabaseResponse;
}

// Next.js proxy routing matcher pattern
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
