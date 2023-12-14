import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | BVS" },
        { name: "description", content: "BVS Home" },
    ];
};

export default function Home() {
    return (
        <h1>Home</h1>
    );
}
