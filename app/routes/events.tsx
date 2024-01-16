import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "All Events | BVS" },
        { name: "description", content: "Full event and volunteer schedule" },
    ];
};

export default function EventsList() {
    return (
        <h1>All Events</h1>
    );
}
