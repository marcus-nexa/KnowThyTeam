import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"; // New
import { auth } from "@/lib/auth"; // New

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathname = request.nextUrl.pathname;

  // Role-based redirects
  if (pathname === "/dashboard" && session.user.role !== "recruiter") {
    return NextResponse.redirect(new URL("/applicant-landing", request.url));
  }

  if (pathname === "/applicant-landing" && session.user.role !== "applicant") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/applicant-landing"], // Updated: add applicant-landing
  runtime: "nodejs", // New: enable Node.js runtime for session fetching
};