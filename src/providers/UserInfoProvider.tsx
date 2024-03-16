import React, { createContext, useContext } from "react";
import { useGetUserInfo } from "../common/useGetUserInfo";
import { IUserInfo } from "../common/types";
import { useAuth } from "../common/useAuth";

const UserInfoContext = createContext<IUserInfo | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const UserInfoProvider: React.FC<Props> = ({ children }) => {
  const auth = useAuth();
  const userInfo = useGetUserInfo(auth.user?.uid);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export default UserInfoProvider;
