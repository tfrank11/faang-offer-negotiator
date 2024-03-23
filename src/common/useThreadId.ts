import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const useThreadId = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { threadId } = useParams();

  // TODO: fix
  useEffect(() => {
    // this always redirects for some reason
    if (!auth.user) {
      // navigate("/")
    }
  }, [auth.user, navigate, threadId]);

  return {
    threadId,
  };
};
