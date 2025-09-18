import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple rate limiting (per IP)
const RATE_LIMIT = 100; // requests per 15 minutes
const WINDOW_MS = 15 * 60 * 1000;
const ipRequests: Record<string, { count: number; start: number }> = {};

export async function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  if (!ipRequests[ip] || now - ipRequests[ip].start > WINDOW_MS) {
    ipRequests[ip] = { count: 1, start: now };
  } else {
    ipRequests[ip].count++;
  }
  if (ipRequests[ip].count > RATE_LIMIT) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Enforce HTTPS in production only (skip for localhost/dev)
  const hostname = request.nextUrl.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  if (!isLocalhost && process.env.NODE_ENV === 'production') {
    if (request.headers.get('x-forwarded-proto') !== 'https') {
      const url = request.nextUrl.clone();
      url.protocol = 'https';
      return NextResponse.redirect(url);
    }
  }

  // Skip middleware if environment variables are not set (development mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: Partial<Record<string, unknown>>) {
          request.cookies.set({ name, value, ...options } as any);
          response = NextResponse.next({ request: { headers: request.headers } });
          // response.cookies.set supports multiple overloads; use name/value overload
          // when options are simple, or pass a ResponseCookie object when available.
          try {
            response.cookies.set(name, value, options as any);
          } catch {
            response.cookies.set({ name, value, ...options } as any);
          }
        },
        remove(name: string, options: Partial<Record<string, unknown>>) {
          request.cookies.set({ name, value: '', ...options } as any);
          response = NextResponse.next({ request: { headers: request.headers } });
          try {
            response.cookies.set(name, '', options as any);
          } catch {
            response.cookies.set({ name, value: '', ...options } as any);
          }
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protected routes
    const protectedRoutes = ['/dashboard', '/game', '/profile', '/leaderboard'];
    const isProtectedRoute = protectedRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );

    // If no authenticated user, check for guest cookie
    const guestCookie = request.cookies.get('guest_user')?.value;
    if (isProtectedRoute && !user) {
      if (guestCookie) {
        // allow guests to proceed; attach minimal guest identity header
        try {
          const decoded = decodeURIComponent(guestCookie || '')
          response.headers.set('x-guest-user', decoded)
        } catch { }
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Redirect to dashboard if authenticated user tries to access auth pages
    if (user && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch (error) {
    // If Supabase auth fails, continue without authentication checks
    console.warn('Supabase auth check failed:', error);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};