import { prisma } from "~/scripts/prisma.server";

export async function getUserByUsername(username: string) {
    return await prisma.user.findUnique({ where: { username } });
}

export async function usernameExists(username: string) {
    return await getUserByUsername(username) !== null;
}
