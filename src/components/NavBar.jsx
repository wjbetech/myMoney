import React from "react";
import styles from "./NavBar.modules.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLogout } from "../hooks/useLogout";
import { useSignup } from "../hooks/useSignup";

const NavBar = () => {
  // add logout and signup functionality
  const { logout } = useLogout();
  const { signup } = useSignup();

  return (
    <nav>
      <ul>
        <div>
          {/* prettier-ignore */}
          <li className="title"><Link to="/">myMoney</Link></li>
        </div>
        <div className="nav-right">
          {/* prettier-ignore */}
          <li className=""><Link to="/">Home</Link></li>
          {/* prettier-ignore */}
          <li><Link to="/login">Login</Link></li>
          {/* prettier-ignore */}
          <li><Link to="/signup">Sign Up</Link></li>
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
