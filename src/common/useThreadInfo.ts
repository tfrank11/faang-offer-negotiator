import { useParams } from "react-router-dom";
import { useFirestore } from "../providers/DBProvider";
import { useEffect, useMemo, useState } from "react";
import { Firestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { ThreadOutcome } from "./types";

export const useThreadInfo = () => {
  const { threadId } = useParams();
  const [isDemoDone, setIsDemoDone] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [finalTC, setFinalTC] = useState<number | null>(null);
  const [threadOutcome, setThreadOutcome] = useState(ThreadOutcome.UNKNOWN);
  const [threadUserUid, setThreadUserUid] = useState("");

  const db = useFirestore();
  const docRef = useMemo(() => {
    return doc(db as Firestore, `threads`, threadId ?? "--");
  }, [db, threadId]);
  const [value] = useDocument(docRef);

  useEffect(() => {
    const data = value?.data();
    if (data) {
      setIsDemoDone(data.demo_finished);
      setIsUnlocked(data.unlocked);
      setIsDisabled(data.disabled);
      setFinalTC(data.finalTC);
      setThreadOutcome(data.threadOutcome);
      setThreadUserUid(data.uid);
    }
  }, [value]);

  return {
    threadId,
    isDemoDone,
    isUnlocked,
    isDisabled,
    finalTC,
    threadOutcome,
    threadUserUid,
  };
};
