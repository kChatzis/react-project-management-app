import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { useLogout } from "../hooks/ useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="primaryHeader">
      <nav>
        <ul className="navlist">
          <li className="navitem">
            <Link to="/">
              <h2 className="logo">Home</h2>
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="navlist">
          {!user && (
            <>
              <li className="navitem">
                <Link to="/login">
                  <h4>Login</h4>
                </Link>
              </li>
              <li className="navitem">
                <Link to="/signup">
                  <h4>SignUp</h4>
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="navitem">
                <Link to="" onClick={logout}>
                  <h4>Logout</h4>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
