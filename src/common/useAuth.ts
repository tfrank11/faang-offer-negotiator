import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface AuthResponse {
  success: boolean;
  error?: string;
}

// interface UserData {
//   email: string;
//   nickname?: string;
//   uid?: string;
// }

interface UseAuthData {
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  signout: () => void;
  user?: User | null;
}

export const useAuth = (): UseAuthData => {
  const auth = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
    }
  }, [auth]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (!auth) {
        return {
          success: false,
          error: "Auth environment is not initialized",
        };
      }
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
      } catch (err) {
        const msg = (err as unknown as { message: string }).message;
        return {
          success: false,
          error: msg,
        };
      }
    },
    [auth]
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      if (!auth) {
        return {
          success: false,
          error: "Auth environment is not initialized",
        };
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        return {
          success: true,
        };
      } catch (err) {
        const msg = (err as unknown as { message: string }).message;
        return {
          success: false,
          error: msg,
        };
      }
    },
    [auth]
  );

  const signout = useCallback(() => {
    if (!auth) {
      return {
        success: false,
        error: "Auth environment is not initialized",
      };
    }
    auth.signOut();
  }, [auth]);

  return {
    login,
    signup,
    signout,
    user: currentUser,
  };
};
