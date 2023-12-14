import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Settings | BVS" },
        { name: "description", content: "BVS Settings" },
    ];
};

export default function MySchedule() {
    return (
        <h1>Settings</h1>
    );
}
