import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("refresh_token")?.value;

  let verifiedToken: string | { id: number } | undefined;
  try {
    verifiedToken = token && (await verifyAuth(token));
  } catch (error) {}

  if (!verifiedToken) {
    if (
      req.nextUrl.pathname !== "/login" &&
      req.nextUrl.pathname !== "/" &&
      req.nextUrl.pathname !== "/signup"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (verifiedToken) {
    if (req.url.includes("/login")) {
      return NextResponse.redirect(new URL("/overview", req.url));
    }

    if (req.url.includes("/signup")) {
      return NextResponse.redirect(new URL("/overview", req.url));
    }
  }
};

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|logo.svg|grid-bg.png).*)",
  ],
};

export default middleware;
