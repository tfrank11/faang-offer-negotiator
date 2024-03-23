import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect, useRef } from "react";

export const useThreadId = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { threadId } = useParams();
  const isLoggedIn = useRef(false);

  useEffect(() => {
    // The auth.user.uid values comes in on a slight lag, so this is to avoid errant redirects
    isLoggedIn.current = !!auth.user?.uid;
    setTimeout(() => {
      if (!isLoggedIn.current) {
        navigate("/");
      }
    }, 500);
  }, [auth.user, navigate, threadId]);

  return {
    threadId,
  };
};
