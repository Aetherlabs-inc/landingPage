import { NextRequest, NextResponse } from "next/server";

import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/src/utils/amplify-utils";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Check if user is authenticated
    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec, {});
                const tokens = session.tokens?.accessToken.toString();
                if (tokens) {
                    // console.log("ID token: ", tokens);
                }
                return session.tokens !== undefined;
            } catch (error) {
                return false;
            }
        },
    });

    // Redirect to dashboard if authenticated
    if (authenticated) {
        if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/signup"
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    } else {
        if (request.nextUrl.pathname.includes("/dashboard")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (authenticated) {
        return response;
    }

    // Avoid infinite redirect loop
    if (request.url === request.nextUrl.href) {
        return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/dashboard",
    ],
};
