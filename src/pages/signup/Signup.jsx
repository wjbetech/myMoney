import React from "react";
import styles from "./Signup.module.css";
import { useState } from "react";

const Signup = () => {
  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, username);
  };

  return (
    <form action="" className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn">Sign Up</button>
    </form>
  );
};

export default Signup;
