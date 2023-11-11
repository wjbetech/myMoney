import React from "react";
import styles from "./NavBar.modules.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLogout } from "../hooks/useLogout";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  // add logout and signup functionality
  const { logout } = useLogout();
  const { signup } = useSignup();

  const { user } = useAuthContext();

  function handleNames(name) {
    let splitName = name.split("");
    return splitName[0].toUpperCase().concat(name.slice(1));
  }

  return (
    <nav>
      <ul>
        <div>
          <li className="title">
            <Link to="/">myMoney</Link>
          </li>
        </div>
        <div className="nav-right">
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>{handleNames(user.displayName)}</li>
              <li>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
