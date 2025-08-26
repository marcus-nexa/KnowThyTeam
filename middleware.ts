import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  // Protect dashboard and applicant-landing as before
  if (pathname === "/dashboard" && (!session || session.user.role !== "recruiter")) {
    return NextResponse.redirect(new URL(session ? "/applicant-landing" : "/", request.url));
  }

  if (pathname === "/applicant-landing" && (!session || session.user.role !== "applicant")) {
    return NextResponse.redirect(new URL(session ? "/dashboard" : "/", request.url));
  }

  // For /test/[testId]: If no session, redirect to quick-access
  if (pathname.startsWith("/test/") && !session) {
    const testId = pathname.split("/")[2];
    return NextResponse.redirect(new URL(`/quick-access/${testId}`, request.url));
  }

  // For /submission/[id]: Require session (handled in getSubmissionById)
  if (pathname.startsWith("/submission/") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/applicant-landing", "/test/:path*", "/submission/:path*"],
  runtime: "nodejs",
};