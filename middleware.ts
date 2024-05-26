import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about-boards",
    "/about-notes",
    "/about-tasks",
    "/dashboard",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/dashboard(.*)"], // Add "/dashboard(.*)" to the matcher
};