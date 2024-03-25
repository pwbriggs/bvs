import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/scripts/session.server";
import { usernamePasswordLogin } from "~/scripts/password.server";
import { prisma } from "~/scripts/prisma.server";

import type { Session } from "~/scripts/session.server";
import type { CredType } from "@prisma/client";

export const authenticator = new Authenticator<Session>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
    new FormStrategy(async ({ form }) => {
        let username = form.get("username");
        let password = form.get("password");
        if (typeof username !== "string" || typeof password !== "string") {
            throw new TypeError("badFormData");
        }
        const session = await usernamePasswordLogin(
            username,
            password,
            await getCredsByType(username, "USERNAME_PASSWORD")
        );
        return session;
    }),
    "usernamePassword"
);

async function getCredsByType(username: string, type: CredType) {
    return await prisma.cred.findMany({
        where: {
            user: {
                username
            },
            type
        }
    });
}
