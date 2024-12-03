import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
//   return NextResponse.redirect(new URL("/home", request.url));
  const isPublicPath = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === '/signup';
  const token = req.cookies.get("accessToken");
  if(isPublicPath && token ){
   return NextResponse.redirect(new URL("/profile", req.url));
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/signup/:path*",
    "/about/:path*",
    "/profile/:path*",
    "/logout",
],
};
