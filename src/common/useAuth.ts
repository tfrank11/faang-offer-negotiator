import { useCallback, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useFirebaseAuth } from "../providers/AuthProvider";

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface UseAuthData {
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  signout: () => void;
  user?: User | null;
}

export const useAuth = (): UseAuthData => {
  const auth = useFirebaseAuth();
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

  const loginWithGoogle = useCallback(async () => {
    if (!auth) {
      return { success: false };
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (!token) {
        return { success: false };
      }
      const user = result.user;
      if (user) {
        setCurrentUser(user);
        return { success: true };
      }
    } catch (error) {
      return { success: false };
    }
    return { success: false };
  }, [auth]);

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
    loginWithGoogle,
    signup,
    signout,
    user: currentUser,
  };
};
