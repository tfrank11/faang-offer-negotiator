import { Firestore, getFirestore } from "firebase/firestore";
import React, { createContext, useContext, useMemo } from "react";
import { useFirebase } from "./FirebaseProvider";

interface Props {
  children: React.ReactNode;
}

const DBContext = createContext<Firestore | undefined>(undefined);

const DBProvider: React.FC<Props> = ({ children }) => {
  const app = useFirebase();
  const db = useMemo(() => (app ? getFirestore(app) : undefined), [app]);
  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
};

export const useFirestore = () => {
  return useContext(DBContext);
};

export default DBProvider;
