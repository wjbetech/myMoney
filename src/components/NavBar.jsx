import React from "react";
import styles from "./NavBar.module.css";
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
      <ul className={styles.ul}>
        <div>
          <li className={styles.home}>
            <Link className={styles.a} to="/">
              myMoney
            </Link>
          </li>
        </div>
        <div className={styles.right}>
          {!user && (
            <>
              <li>
                <Link className={styles.a} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={styles.a} to="/signup">
                  Sign Up
                </Link>
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
