import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ["/((?!_next|api).*)"], // all routes except _next and api
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  const authRoutes = ["/login", "/signup"];

  if (authRoutes.includes(url.pathname)) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        url.pathname = "/";
        return NextResponse.redirect(url);
      } catch (err) {
        // invalid token, allow access to login/signup
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protect other routes
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
