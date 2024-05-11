import { prisma } from "~/scripts/prisma.server";
import { createSessionStorage } from "@remix-run/node";

export type Session = {
    username: string
}

function databaseSessionStorage(cookie: any) {
    return createSessionStorage({
        cookie,
        async createData(data) {
            const id = `${Date.now()}_${Math.floor(Math.random() * 2 ** 31)}`;
            await prisma.session.create({
                data: {
                    id,
                    data
                }
            });
            return id;
        },
        async readData(id) {
            return await prisma.session.findUnique({
                where: { id }
            })
        },
        async updateData(id, data) {
            await prisma.session.update({
                where: { id },
                data: {
                    data
                }
            });
        },
        async deleteData(id) {
            await prisma.session.delete({
                where: { id }
            });
        },
    });
}

const sessionSecret = process.env.NODE_ENV === "production" ? process.env.SESSION_SECRET : "dev";
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set in prod");
}

export const sessionStorage = databaseSessionStorage({
    cookie: {
        name: "BVS_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
