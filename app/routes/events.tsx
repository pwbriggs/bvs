import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/scripts/prisma.server";

export const meta: MetaFunction = () => {
    return [
        { title: "All Events | BVS" },
        { name: "description", content: "Full event and volunteer schedule" },
    ];
};

export async function loader() {
    const numEvents = await prisma.event.count();
    return json({ numEvents });
}

export default function EventsList() {
    const numEvents = useLoaderData<typeof loader>().numEvents;
    return (
        <h1>All Events ({numEvents})</h1>
    );
}
