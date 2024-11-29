import { memo } from "react";
import { Link } from "react-router-dom";
import "../css/notFound.css";

const NotFound = memo(() => {
  return (
    <div className="notFoundContainer">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </div>
  );
});

export default NotFound;
