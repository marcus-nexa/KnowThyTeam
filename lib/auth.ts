import { betterAuth } from "better-auth";
import { schema } from "@/db/schema";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
        enabled: true, 
    }, 
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                input: true,
            },
            org: { // New
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    plugins: [nextCookies()] // make sure this is the last plugin in the array
});