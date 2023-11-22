import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [pending, setPending] = useState(null);
	const [cancelled, setCancelled] = useState(false);

	// dispatcher
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		// update states
		if (!cancelled) {
			setError(null);
			setPending(true);
		}

		try {
			// log user in
			const response = await projectAuth.signInWithEmailAndPassword(
				email,
				password,
			);

			// dispatch login action
			dispatch({ type: "LOGIN", payload: response.user });

			if (!cancelled) {
				setPending(false);
				setError(null);
			}
		} catch (error) {
			if (!cancelled) {
				console.log(error.message);
				setError(error.message);
				setPending(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			setCancelled(true);
		};
	}, []);

	return { login, error, pending };
};
