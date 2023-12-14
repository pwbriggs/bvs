import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Full Schedule | BVS" },
        { name: "description", content: "Full event and volunteer schedule" },
    ];
};

export default function MySchedule() {
    return (
        <h1>Full Schedule</h1>
    );
}
