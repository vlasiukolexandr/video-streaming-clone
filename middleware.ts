import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from './app/i18n/settings';
import withAuth from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

acceptLanguage.languages(languages);

// Allowed routes for access without login.
export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|en/auth|uk-UA/auth|_next/static|_next/image|assets|images|favicon.ico|sw.js).*)']
}

export const cookieName = 'i18next';

function middleware(request: NextRequest) {
  // Set page url to know what page client wants to load.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  // Define and set i18n settings.
  let lng;
  if (request.cookies.has(cookieName)) lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url))
  }

  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer') || '');
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);

    return response;
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export default withAuth(middleware,{
  callbacks: {
    authorized: async ({ req }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
      })

      return !!token
    },
  },
});
