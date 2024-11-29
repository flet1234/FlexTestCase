import { memo } from "react";
import { Link } from "react-router-dom";

const NavBarLink = memo(({ link, isActive }) => {
    return (
        <Link to={link.path} className={isActive ? "activeLink" : "passiveLink"} aria-current={isActive ? "page" : undefined}>
            {link.name}
        </Link>
    )
});

export default NavBarLink;