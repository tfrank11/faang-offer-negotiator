import { useContext, useMemo } from "react";
import { IUserInfo } from "./types";
import { DBContext } from "../App";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export const useGetUserInfo = (uid?: string): IUserInfo => {
  const db = useContext(DBContext);
  const docRef = doc(db, `user_info`, uid ?? "-");
  const [value] = useDocument(docRef);

  const userInfo = useMemo<IUserInfo>(() => {
    return {
      tokens: value?.data()?.tokens,
    };
  }, [value]);

  return userInfo;
};
