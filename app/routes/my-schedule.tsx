import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Your Schedule | BVS" },
        { name: "description", content: "Events you are scheduled to volunteer at." },
    ];
};

export default function MySchedule() {
    return (
        <h1>My Schedule</h1>
    );
}
