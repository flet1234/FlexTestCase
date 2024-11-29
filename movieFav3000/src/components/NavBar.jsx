import { useLocation } from "react-router-dom"
import NavBarLink from "./NavBarLink";
import "../css/navBar.css"
import { memo } from "react";

const links = [{ name: "Popular", path: "/popular/1" }, { name: "Now in theatres", path: "/now-playing/1" }, { name: "Your favorites", path: "/favorites" }];

const NavBar = memo(() => {

    const location = useLocation(); 

    return (
      <nav className="navBarContainer">
        {links.map((link) => (
          <NavBarLink
            key={link.name}
            link={link}
            isActive={location.pathname.startsWith(link.path.slice(0, -1))}
          />
        ))}
      </nav>
    );
})

export default NavBar