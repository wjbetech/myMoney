import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, pending } = useLogin();

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form action="" className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      {pending ? (
        <button className="btn" disabled>
          Logging in..
        </button>
      ) : (
        <button className="btn">Login</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
