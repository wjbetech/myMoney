import React from "react";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transactions:</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
