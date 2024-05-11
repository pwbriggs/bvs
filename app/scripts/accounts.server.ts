export async function userExists(username: string) {
    return await prisma.user.findUnique({ where: { username } }) !== null;
}
