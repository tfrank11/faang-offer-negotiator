import { throttle } from "lodash";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createThread } from "./api";

export const useStartThread = () => {
  const navigate = useNavigate();
  const startThread = useCallback(
    async (setLoading?: (val: boolean) => void) => {
      setLoading?.(true);
      const response = await createThread();
      setLoading?.(false);
      if (response?.threadId) {
        navigate(`/${response.threadId}`);
      }
    },
    [navigate]
  );

  const throttledStartThread = useMemo(() => {
    return throttle(startThread, 20_000);
  }, [startThread]);

  return { startThread: throttledStartThread };
};
