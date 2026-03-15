import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function runs on every request
export const middleware = withAuth(
    function onSuccess(req) {
        // If we reach here, the user is authenticated
        return NextResponse.next();
    },
    {
        // Redirect to login if not authenticated
        callbacks: {
            authorized: ({ token }) => !!token, // true if token exists, false otherwise
        },
        pages: {
            signIn: "/login", // Redirect unauthenticated users to /login
        },
    }
);

// Apply middleware only to protected routes
export const config = {
    matcher: [
        // Protected backend routes
        "/dashboard/:path*",
        "/analytics/:path*",
        "/inventory/:path*",
        "/inventoryadjustment/:path*",
        "/invoice/:path*",
        "/items/:path*",
        "/supplier/:path*",
        "/user/:path*",
        "/warehouse/:path*",
    ],
};
