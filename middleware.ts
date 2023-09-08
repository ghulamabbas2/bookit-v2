import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {});

export const config = {
  matcher: ["/me/:path*"],
};
