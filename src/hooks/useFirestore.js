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
      return { document: null, isPending: true, error: null, success: false };

    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
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

    // load timestamp
    const createdAt = timestamp.fromDate(new Date());

    try {
      const addDoc = await fsCollection.add(document);
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };
  // DELETE A DOCUMENT
  const deleteDocument = async (id) => {
    dispatch({ type: "PENDING" });
    try {
      const deleteDoc = await fsCollection.deleteDoc;
      dispatchIfNotCancelled({ type: "DEL_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  // cleanup useEffect func
  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
