import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // useRef to break out of infinite looping
  // caused by Array-type dependency
  // _query which is diff on every call
  const query = useRef(_query).current;

  useEffect(() => {
    let fsCollection = projectFirestore.collection(collection);

    if (query) {
      fsCollection = fsCollection.where(...query);
    }

    const unsubscribe = fsCollection.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc);
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query]);

  return { documents, error };
};
