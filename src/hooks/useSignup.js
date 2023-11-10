import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  // set state
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);

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

      // turn off pending and error
      setPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);

      // turn off pending
      setPending(false);
    }
  };

  // return key pieces of information
  return { error, pending, signup };
};
