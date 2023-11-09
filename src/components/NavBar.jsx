import React from "react";
import styles from "./NavBar.modules.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <Link to="/">
            <li className="title">myMoney</li>
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/">
            <li className="">Home</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
