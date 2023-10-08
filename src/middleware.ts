import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const redis = new Redis({
	url: process.env.REDIS_URL,
	token: process.env.REDIS_SECRET,
});

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "1 h"),
});

export default withAuth(
	async function middleware(req) {
		const pathname = req.nextUrl.pathname; //<- relative url path

		// rate limiting management
		if (pathname.startsWith("/api")) {
			const ip = req.ip ?? "127.0.0.1";
			try {
				const { success } = await ratelimit.limit(ip);
				if (!success)
					return NextResponse.json({ error: "too many requests..." });
				return NextResponse.next();
			} catch (error) {
				return NextResponse.json({ error: "general server error" });
			}
		}

		// manage route protection

		const token = await getToken({ req });
		const isAuth = !!token;

		const isAuthPage = pathname.startsWith("/login");

		const sensitiveRoutes = ["/dashboard"];

		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL("/dashboard", req.url));
			}
			return null;
		}

		if (
			!isAuth &&
			sensitiveRoutes.some((route) => pathname.startsWith(route))
		) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	},
	{
		callbacks: {
			async authorized() {
				return true;
			},
		},
	}
);

/*
    using callback: {authorized()} is a workaround for handling redirect on auth pages, return true so middleware above is always called
*/

export const config = {
	matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
