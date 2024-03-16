import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppPage, IAppContext } from "../common/types";
import { useAuth } from "../common/useAuth";

interface Props {
  children: React.ReactNode;
}

// export interface IAppContext {
//     setPage: (val: AppPage) => void;
//     threadId: string;
//     setThreadId: (val: s

const AppInfoContext = createContext<IAppContext | undefined>(undefined);

const AppInfoProvider: React.FC<Props> = ({ children }) => {
  const auth = useAuth();
  const [page, setPage] = useState(AppPage.LANDING);
  const [threadId, setThreadId] = useState("");

  useEffect(() => {
    if (!auth.user) {
      setPage(AppPage.LANDING);
    }
  }, [auth.user]);

  const appInfo = useMemo(() => {
    return {
      page,
      setPage,
      threadId,
      setThreadId,
    };
  }, [page, threadId]);

  return (
    <AppInfoContext.Provider value={appInfo}>
      {children}
    </AppInfoContext.Provider>
  );
};

export const useAppInfo = () => {
  return useContext(AppInfoContext);
};

export default AppInfoProvider;
