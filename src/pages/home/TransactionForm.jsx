import React, { useEffect } from "react";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  // state setters
  const [name, setName] = useState("");
  const [transactionValue, setTransactionValue] = useState("");

  // firestore refs
  const { addDocument, response } = useFirestore("transactions");

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      transactionValue,
    });
  };

  // reset fields on successful submission
  useEffect(() => {
    console.log("WORKING INSIDE useEffect");
    if (response.success) {
      console.log("WORKING INSIDE response.success");
      setName("");
      setTransactionValue("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Value (₩):</span>
          <input
            type="number"
            required
            onChange={(e) => setTransactionValue(e.target.value)}
            value={transactionValue}
          />
        </label>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
