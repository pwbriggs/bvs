import bcrypt from "bcryptjs";
import { getUserByUsername } from "~/scripts/accounts.server";

import type { Cred } from "@prisma/client";
import type { Session } from "~/scripts/session.server";

export async function usernamePasswordLogin(
    username: string,
    password: string,
    passwordCreds: Cred[]
) {
    const user = await getUserByUsername(username);
    if (user == null) {
        throw new Error("badUsername");
    }
    if (passwordCreds.length == 0) {
        throw new Error("noPasswords");
    }
    if (password.length == 0) {
        throw new Error("missingPassword");
    }

    for (const cred of passwordCreds) {
        if (await bcrypt.compare(password, (cred.cred as { hash: string }).hash)) {
            let session: Session = { user };
            return session;
        }
    }

    throw new Error("badPassword");
}
