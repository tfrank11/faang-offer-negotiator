import React, { createContext, useContext, useMemo, useState } from "react";
import { IAppContext } from "../common/types";

interface Props {
  children: React.ReactNode;
}

const AppInfoContext = createContext<IAppContext | undefined>(undefined);

const AppInfoProvider: React.FC<Props> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const appInfo = useMemo(() => {
    return {
      isAuthModalOpen,
      setIsAuthModalOpen,
    };
  }, [isAuthModalOpen]);

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
