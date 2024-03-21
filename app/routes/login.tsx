import { Form, useActionData } from "@remix-run/react";
import { authenticator } from "~/scripts/auth.server";
import { json } from "@remix-run/node";

import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Log in | BVS" },
        { name: "description", content: "Log in to your account for personalized content." },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    // If the user is already authenticated redirect to home
    return await authenticator.isAuthenticated(request, {
        successRedirect: getNextUrl(request),
    });
}

function getNextUrl(request: Request) {
    try {
        const url = new URL(request.url).searchParams.get("next");
        if (typeof url !== "string") {
            return "/";
        }
        try {
            return new URL(url).pathname; // No cross-origin redirects happening here!
        } catch {
            return url;
        }
    } catch (e) {
        return "/";
    }
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        return await authenticator.authenticate("usernamePassword", request, {
            successRedirect: getNextUrl(request),
            throwOnError: true
        });
    } catch (e) {
        switch ((e as Error).message) {
            case "badUsername":
                return json({ formError: { message: "User not found" } });
                break;
            default:
                return json({
                    formError: {
                        message: `Unknown authentication error "${(e as Error).message}"`
                    }
                });
        }
    }
}

export default function Login() {
    const actionData = useActionData<typeof action>();
    return (
        <Form method="post" replace encType="multipart/form-data">
            <input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
                required
            /><br />
            <input
                type="password"
                name="password"
                placeholder="Password   "
                autoComplete="current-password"
                required
            /><br />
            <button>Sign In</button>
            <div>{actionData?.formError && <b>{actionData.formError.message}</b>}</div>
        </Form>
    );
}
