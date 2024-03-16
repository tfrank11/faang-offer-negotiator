import React, { createContext, useContext } from "react";
import { firebaseConfig } from "../firebaseConfig";
import { FirebaseApp, initializeApp } from "firebase/app";

interface Props {
  children: React.ReactNode;
}

const FirebaseContext = createContext<FirebaseApp | undefined>(undefined);

const FirebaseProvider: React.FC<Props> = ({ children }) => {
  const app = initializeApp(firebaseConfig);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default FirebaseProvider;
