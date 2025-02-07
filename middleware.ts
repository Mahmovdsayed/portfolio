import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./functions/verifyToken";

export async function middleware(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  if (token && (pathname === "/login" || pathname === "/signup")) {
    try {
      await verifyToken(token);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (error) {
      console.error("Invalid Token:", error);
    }
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
