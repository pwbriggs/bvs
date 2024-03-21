import bcrypt from "bcryptjs";
import { userExists } from "./accounts.server";

import type { Cred } from "@prisma/client";
import type { Session } from "~/scripts/session.server";

export async function usernamePasswordLogin(
    username: string,
    password: string,
    passwordCreds: Cred[]
) {
    if (passwordCreds.length == 0) {
        if (!await userExists(username)) {
            throw new Error("badUsername");
        }
        throw new Error("noPasswords");
    }
    if (password.length == 0) {
        throw new Error("missingPassword");
    }

    for (const cred of passwordCreds) {
        if (await bcrypt.compare(password, (cred.cred as { hash: string }).hash)) {
            let session: Session = { username };
            return session;
        }
    }

    throw new Error("badPassword");
}
