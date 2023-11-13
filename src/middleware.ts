import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;
  const urlEncodedPathname = encodeURIComponent(pathname);
  //Return to /login if don't have a session
  if (!session) {

    return NextResponse.redirect(new URL(`/signin?pathname=${urlEncodedPathname}`, request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL(`/signin?pathname=${urlEncodedPathname}`+ responseAPI.status, request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/admin/:path*"],
};