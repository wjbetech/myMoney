import React from "react";
import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionList = ({ transactions }) => {
	const { deleteDocument, response } = useFirestore("transactions");

	console.log(response);

	return (
		<ul className={styles.transactions}>
			<hr />
			{transactions?.map((t) => (
				<li key={t.id}>
					<p className={styles.name}>{t.name}</p>
					<p className={styles.amount}>
						₩{t.transactionValue}{" "}
						<button
							className="delete-btn"
							type="button"
							onClick={() => deleteDocument(t.id)}
						>
							X
						</button>
					</p>
				</li>
			))}
		</ul>
	);
};

export default TransactionList;
