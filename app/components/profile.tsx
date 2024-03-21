import { Link } from "@remix-run/react";

export function ProfileMenu() {
    // For now we just always display a login link: this is terrible UX, but simple.
    // TODO show here if the user is logged in or not.
    return <GoToLogin />
}

function GoToLogin() {
    return (
        <Link to="/login">Log in</Link>
    );
}
