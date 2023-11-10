import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async (user) => {
    // update states
    setError(null);
    setPending(true);
    try {
      // sign out user
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      setPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);

      // turn off pending
      setPending(false);
    }
  };

  return { logout, error, pending };
};
