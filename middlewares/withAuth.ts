import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPagePatterns = [
  /^\/add-product$/,
  /^\/product\/[^\/]+\/update$/, // `/product/{id}/update`
];
const authPage = ['/sign-in', '/sign-up'];

function isAdminPage(pathname: string) {
  return onlyAdminPagePatterns.some((pattern) => pattern.test(pathname));
}

function isAuthMatch(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export default function withAuth(middleware: NextMiddleware, requireAuth: string[]) {
  return async(req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if(isAuthMatch(pathname, requireAuth)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      const isOnAuthPage = isAuthMatch(pathname, authPage);

      if(!token && !isOnAuthPage) {
        const url = new URL('/sign-in', req.url)
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if(token) {
        if(isOnAuthPage) {
          return NextResponse.redirect(new URL('/', req.url));
        }
        if(token.role !== 'admin' && isAdminPage(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    }
    return middleware(req, next)
  }
}