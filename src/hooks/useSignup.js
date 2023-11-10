import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  // set state
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  // grab our context
  const { dispatch } = useAuthContext();

  // pass through our details and await
  const signup = async (email, password, displayName) => {
    setError(null);
    setPending(true);

    try {
      // sign our user up
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete sign up.");
      }

      // add display name to user
      await response.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      if (!cancelled) {
        setError(null);
        setPending(false);
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

  // return key pieces of information
  return { error, pending, signup };
};
