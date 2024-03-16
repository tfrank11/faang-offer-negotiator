import React, { createContext, useContext } from "react";
import { Auth, getAuth } from "firebase/auth";
import { useFirebase } from "./FirebaseProvider";

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<Auth | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const app = useFirebase();
  const auth = getAuth(app);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useFirebaseAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default AuthProvider;
