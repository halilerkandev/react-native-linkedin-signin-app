import React from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login, logout, selectUser } from "@/slices/FirebaseSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      if (currentUser) {
        dispatch(
          login({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
  };
};
