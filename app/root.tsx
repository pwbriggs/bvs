import type { LinksFunction } from "@remix-run/node";
import {
    isRouteErrorResponse,
    Link,
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { SpeedInsights } from "@vercel/speed-insights/remix"

import faviconSvg from "~/images/favicon.svg";

import logo from "~/images/icon.svg";
import invertedLogo from "~/images/icon-inverted.svg";
import githubLogoSvgForLight from "~/images/github-mark.svg";
import githubLogoPngForLight from "~/images/github-mark.png";
import githubLogoSvgForDark from "~/images/github-mark-white.svg";
import githubLogoPngForDark from "~/images/github-mark-white.png";

import globalStylesheet from "~/styles/global.css";
import globalWideStylesheet from "~/styles/global-wide.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: globalStylesheet },
    { rel: "stylesheet", media: "(min-width: 900px)", href: globalWideStylesheet },
    { rel: "icon", type: "image/svg+xml", sizes: "any", href: faviconSvg}
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
            <h1>
                <img src={invertedLogo} alt=""/>
                Better Volunteer Scheduler
            </h1>
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
        <footer className="bvs-footer">
            This is a free and open-source webapp licensed under the MIT License. View the source or
            file an issue on
            <Link to="https://github.com/pwbriggs/bvs">
                <picture>
                    <source
                        media="prefers-color-scheme: dark"
                        srcSet={`${githubLogoPngForDark}, ${githubLogoSvgForDark}`}
                    />
                    <img
                        src={githubLogoPngForLight}
                        srcSet={githubLogoSvgForLight}
                        className="github-logo"
                        alt=""
                    />
                </picture>
                <span className="underline">GitHub</span>
            </Link>
        </footer>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        <SpeedInsights/>
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
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
                        <img src={logo} style={{width: "2em"}} alt=""/> Better Volunteer Scheduler
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
                    <p style={{fontStyle: "italic"}}>
                        If this error persists and you believe something is wrong, please file an
                        issue on <Link to="https://github.com/pwbriggs/bvs/issues">GitHub</Link>.
                    </p>
                </div>
            </body>
        </html>
    );
}
