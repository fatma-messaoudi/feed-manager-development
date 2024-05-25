'use client'

import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";


export default authMiddleware({
   

    publicRoutes: ['/', 'api/webhook/clerk','/studio','/api/create-document'],

    afterAuth(auth, req, evt) {
        // const {setOrgName} = useFeedManagerContext()
        
        // setOrgName(auth.organization?.name)

        //Protected Routes
        const adminRoutes = ["/admin", "/admin/createUser", "/admin/manageOrg", ]
        const userRoutes = ["/user", ]

        // 01.Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }

        // 02.Handle User Public Routes
        if (
            auth.userId && 
            auth.userId !== "user_2gwHYCg8OsSX84XOaTrILwZy4hK" && 
            adminRoutes.includes(req.nextUrl.pathname) 
        ) {
            console.log("user Configutration")
            const absoluteURL = new URL("/user", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }

        // 03.Handle Admin Public Routes
        if (
            auth.userId &&
            auth.userId.match("user_2gwHYCg8OsSX84XOaTrILwZy4hK") &&
            userRoutes.includes(req.nextUrl.pathname)
        ) {
            console.log("Admin Configutration")
            const absoluteURL = new URL("/admin", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }


        // 04.Redirectiong To USER/ADMIN Page After Login
        if (
            auth.userId &&
            req.nextUrl.pathname === "/"
        ) {
            console.log("Redirecting After sign-in")
            const absoluteURL = new URL("/user", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }
        
    }
})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
