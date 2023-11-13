import React from "react";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  // bring in user context
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.content}>Transactions:</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
