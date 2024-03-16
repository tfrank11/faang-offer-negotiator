import { useMemo } from "react";
import { IUserInfo } from "./types";
import { useDocument } from "react-firebase-hooks/firestore";
import { Firestore, doc } from "firebase/firestore";
import { useFirestore } from "../providers/DBProvider";

export const useGetUserInfo = (uid: string | undefined): IUserInfo => {
  const db = useFirestore();
  const docRef = doc(db as Firestore, `user_info`, uid ?? "--");
  const [value] = useDocument(docRef);

  const userInfo = useMemo<IUserInfo>(() => {
    return {
      tokens: value?.data()?.tokens,
    };
  }, [value]);

  return userInfo;
};
