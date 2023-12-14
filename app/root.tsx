import type { LinksFunction } from "@remix-run/node";
import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";

import globalStylesheet from "~/styles/global.css";
import globalWideStylesheet from "~/styles/global-wide.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: globalStylesheet },
    { rel: "stylesheet", media: "(min-width: 900px)", href: globalWideStylesheet },
];

export default function App() {
    // noinspection HtmlRequiredTitleElement because title included in <Meta/> element.
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <header className="bvs-header">
            Better Volunteer Scheduler
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/my-schedule/">Your Schedule</NavLink></li>
                    <li><NavLink to="/full-schedule/">Full Schedule</NavLink></li>
                    <li><NavLink to="/settings/">Settings</NavLink></li>
                </ul>
            </nav>
        </header>
        <main className="bvs-main">
            <Outlet/>
        </main>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    let message;

    if (isRouteErrorResponse(error)) {
        message = (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        );
    } else if (error instanceof Error) {
        message = (
            <>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </>
        );
    } else {
        message = <h1>Unknown Error</h1>;
    }
    return (
        <html>
            <head>
                <title>Oh no!</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <body>
                <div style={{
                    backgroundColor: "#fce4e4",
                    fontFamily: '"Segoe UI", sans-serif',
                    color: "darkred",
                    margin: "1em",
                    padding: "2rem",
                    borderRadius: "1em",
                }}>
                    {message}
                    <a href="/">Go back to home page</a>
                </div>
            </body>
        </html>
    );
}
