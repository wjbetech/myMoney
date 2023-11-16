import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

// build initial state for initial render
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { success: false, isPending: true, error: null, document: null };

    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };

    case "ADD_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  // consolidate state update logic outside of component
  // in useReducer reducer function
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // cleanup func required state
  const [cancelled, setCancelled] = useState(false);

  // reference our collection
  const fsCollection = projectFirestore.collection(collection);

  // dispatch sub-hook
  const dispatchIfNotCancelled = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // boilerplate funcs for our collection
  // ADD A DOCUMENT
  const addDocument = async (document) => {
    dispatch({ type: "PENDING" });

    try {
      // load timestamp
      const createdAt = timestamp.fromDate(new Date());
      const addDoc = await fsCollection.add({ ...document, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };
  // DELETE A DOCUMENT
  const deleteDocument = async (id) => {};

  // cleanup useEffect func
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
