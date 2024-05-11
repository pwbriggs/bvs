import { authenticator } from "~/scripts/auth.server";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Your Schedule | BVS" },
        { name: "description", content: "Events you are scheduled to volunteer at." },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    // If the user is already authenticated redirect to home
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login?next=https://google.com/my-schedule",
    });
}

export default function MySchedule() {
    return (
        <h1>My Schedule</h1>
    );
}
