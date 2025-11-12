import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db.js";
import { openAPI } from "better-auth/plugins";
import * as schema from "../src/db/schema/auth.js";
export const auth = betterAuth({
    debug: true,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [
        openAPI()
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    trustedOrigins: ["http://localhost:5173"]
});
