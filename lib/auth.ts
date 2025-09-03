import { betterAuth } from "better-auth";
import { schema } from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { ServerClient } from "postmark";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import { render } from "@react-email/render";
import React from "react"; // Needed for React.createElement

const postmarkClient = new ServerClient(
  process.env.POSTMARK_SERVER_TOKEN as string,
);

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        const html = await render(
          React.createElement(ForgotPasswordEmail, {
            username: user.name || "there",
            resetUrl: url,
            userEmail: user.email,
          }),
        );

        await postmarkClient.sendEmail({
          From: process.env.POSTMARK_FROM_EMAIL as string,
          To: user.email,
          Subject: "Reset your password",
          HtmlBody: html,
          MessageStream:
            process.env.POSTMARK_MESSAGE_STREAM || "outbound",
        });
      } catch (error) {
        console.error("Error sending reset password email:", error);
        // Optionally rethrow or handle based on your needs
      }
    },
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
      org: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
