import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export async function middleware(request: NextRequest) {

  const sessionCookie = getSessionCookie(request);


  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/services/add",
    "/services/manage",
  ];


  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );


  if (isProtectedRoute && !sessionCookie) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }


  return NextResponse.next();

}


export const config = {

  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/services/add/:path*",
    "/services/manage/:path*",
  ],

};