import { withAuth } from "next-auth/middleware";
import { env } from "./env";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

export default withAuth({
  secret: env.NEXTAUTH_SECRET,
});
