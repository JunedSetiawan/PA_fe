import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAccessFeature } from "./utils/internal/sioma";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
        return false;
      }
      return true;
    },
  },
});

export function middleware(request: NextRequest) {
  //setup var
  const { pathname } = request.nextUrl;
  const prefix = String(pathname).split("/")[1];
  const userToken = request.cookies.get("userToken")?.value;
  function logout() {
    request.cookies.delete("userAuthed");
    request.cookies.delete("userToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  function abort() {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (["login"].includes(prefix)) {
    // --> route guest
    if (userToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // --> route authed
    if (!userToken) {
      return logout();
    } else {
      // get feature access
      let featureAccesses: any = ["landing-page>=2"];
      try {
        const cookieUserAuth = request.cookies.get("userAuthed")?.value ?? "";
        featureAccesses =
          JSON.parse(cookieUserAuth)?.access?.ER?.featureAccesses;
      } catch (error) {}

      // check access
      switch (prefix) {
        case "virtual-rapor":
          if (
            !checkAccessFeature(
              ["show-self-virtual-rapor@ER>=1"],
              featureAccesses
            )
          )
            return abort();
          break;

        case "kelas":
          if (
            !checkAccessFeature(
              ["show-all-data-class@ER>=1", "show-data-class-taughted@ER>=1"],
              featureAccesses
            )
          )
            return abort();
          break;

        case "mata-pelajaran":
          if (
            !checkAccessFeature(
              [
                "grading-all-student-lesson@ER>=1",
                "grading-student-lesson-taughted@ER>=1",
              ],
              featureAccesses
            )
          )
            return abort();
          break;

        case "ekstrakulikuler":
          if (
            !checkAccessFeature(
              [
                "grading-all-student-excul@ER>=1",
                "grading-student-excul-taughted@ER>=1",
              ],
              featureAccesses
            )
          )
            return abort();
          break;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|public|favicon.ico).*)', // <-- uncomment this line to enable middleware
  ],
};
