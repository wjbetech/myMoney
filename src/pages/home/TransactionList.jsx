import React from "react";
import styles from "./Home.module.css";

const TransactionList = ({ transactions }) => {
  return (
    <ul className={styles.transactions}>
      {transactions &&
        transactions.map((t) => (
          <li key={t.id}>
            <p className={styles.name}>{t.name}</p>
            <p className={styles.amount}>₩{t.transactionValue}</p>
          </li>
        ))}
    </ul>
  );
};

export default TransactionList;
