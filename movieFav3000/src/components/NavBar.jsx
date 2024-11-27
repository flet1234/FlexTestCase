import { Link, useLocation } from "react-router-dom"
import "../css/navBar.css"

const NavBar = () => {

    const location = useLocation(); 
 
    const links = [{ name: "Popular", path: "/popular/1" }, { name: "Now in theatres", path: "/now-playing/1" }, { name: "Your favorites", path: "/favorites" }];

    return (
      <nav className="navBarContainer">
        {links.map((link, index) => (
          <Link
            key={link.name}
            to={link.path}
            className={`${location.pathname.startsWith((link.path).slice(0,-1)) ? "activeLink" : "passiveLink"}`}
            aria-current={location.pathname.startsWith(link.path) ? "page" : undefined}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    );
}

export default NavBar