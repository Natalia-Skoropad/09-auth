import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPrivate = privateRoutes.some(r => pathname.startsWith(r));
  const isPublic = publicRoutes.some(r => pathname.startsWith(r));
  const access = req.cookies.get('accessToken')?.value;

  if (isPrivate && !access) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (isPublic && access) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
