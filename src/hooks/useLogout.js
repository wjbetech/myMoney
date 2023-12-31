import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  // dispatcher
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // update states
    if (!cancelled) {
      setError(null);
      setPending(true);
    }

    try {
      // sign out user
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      setPending(false);
      setError(null);
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

  return { logout, error, pending };
};
