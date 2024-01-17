import type { LinksFunction } from "@remix-run/node";
import {
    isRouteErrorResponse,
    Link,
    Links,
    LiveReload,
    Meta,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { SpeedInsights } from "@vercel/speed-insights/remix"

import faviconSvg from "~/images/favicon.svg";

import logo from "~/images/icon.svg";

export const links: LinksFunction = () => [
    { rel: "icon", type: "image/svg+xml", sizes: "any", href: faviconSvg }
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>🚧 Under Construction | BVS</title>
                <Links />
            </head>
            <body style={{ backgroundColor: "hsl(30 90% 90%)" }}>
                <div style={{
                    fontFamily: '"Segoe UI", sans-serif',
                    color: "darkred",
                    margin: "1em",
                    padding: "2rem",
                }}>
                    <div style={{
                        color: "black",
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                    }}>
                        <img src={logo} style={{ height: "2em", width: "2em" }} alt="" /> Better Volunteer Scheduler
                    </div>
                    <h1>🚧 Under construction</h1>
                    <p>
                        Sorry, we're still actively building this app. Check again soon!
                    </p>
                    <p>
                        You can watch the development in action (or even do a little work yourself)
                        on <Link to="https://github.com/pwbriggs/bvs">GitHub</Link>.
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <a href="https://github.com/pwbriggs/bvs/commits/dev/">
                            <img
                                alt="GitHub commit activity"
                                src="https://img.shields.io/github/commit-activity/m/pwbriggs/bvs?logo=github"
                            />
                        </a>
                        <a href="https://github.com/pwbriggs/bvs/commits/dev/">
                            <img
                                alt="GitHub last commit (branch)"
                                src="https://img.shields.io/github/last-commit/pwbriggs/bvs/dev?logo=github"
                            />
                        </a>
                        <a href="https://github.com/pwbriggs/bvs">
                            <img
                                alt="See the source on GitHub"
                                src="https://img.shields.io/badge/see_the_source_on-github-red?logo=github"
                            />
                        </a>
                    </div>
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
                <SpeedInsights />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    let message;
    let title = "Internal error | BVS";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText} | BVS`;
        message = (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <pre>{error.data}</pre>
            </>
        );
    } else if (error instanceof Error) {
        message = (
            <>
                <h1>😬 Internal error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </>
        );
    } else {
        message = <h1>😬 Unknown internal error</h1>;
    }
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div style={{
                    backgroundColor: "hsl(0 90% 95%)",
                    fontFamily: '"Segoe UI", sans-serif',
                    color: "darkred",
                    margin: "1em",
                    padding: "2rem",
                    borderRadius: "1em",
                }}>
                    <div style={{
                        color: "black",
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                    }}>
                        <img src={logo} style={{ height: "2em", width: "2em" }} alt="" /> Better Volunteer Scheduler
                    </div>
                    {message}
                    <a href="/" style={{
                        color: "black",
                        backgroundColor: "hsl(0 90% 90%)",
                        textDecoration: "none",
                        display: "inline-block",
                        padding: "1em",
                        margin: "1em 0",
                        border: "3px solid darkRed",
                        borderRadius: "1em",
                        fontWeight: "bold"
                    }}>
                        &larr; Go back to home page
                    </a>
                    <p>
                        We try as hard as possible to keep everything bug-free and running smoothly,
                        but sometimes errors such as this one slip through. Sorry for the
                        inconvenience!
                    </p>
                    <p style={{ fontStyle: "italic" }}>
                        If this error persists and you believe something is wrong, please file an
                        issue on <Link to="https://github.com/pwbriggs/bvs/issues">GitHub</Link>.
                    </p>
                </div>
            </body>
        </html>
    );
}
