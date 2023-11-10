import React from "react";
import styles from "./Signup.module.css";
import { useState } from "react";

// import the signup hook
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  // bring in signup hook
  const { signup, pending, error } = useSignup();

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);

    // setEmail("");
    // setPassword("");
    // setDisplayName("");
  };

  return (
    <form action="" className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
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
      {pending && (
        <button className="btn" disabled>
          Signing up..
        </button>
      )}
      {!pending && <button className="btn">Sign Up</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
