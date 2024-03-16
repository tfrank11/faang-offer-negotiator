import { useCallback, useEffect, useRef, useState } from "react";
import { IWebMessage, ThreadOutcome } from "./types";
import { getMessages, sendThreadMessage } from "./api";
import { getMessagesFromApiData } from "./utils";
import { useAuth } from "./useAuth";
import { useAppInfo } from "../providers/AppInfoProvider";

interface IUseThreadData {
  sendMessage: (message: string) => void;
  messages: IWebMessage[];
  isDone: boolean;
  threadOutcome: ThreadOutcome;
  finalTC?: number;
}

export const useThread = (): IUseThreadData => {
  const appContext = useAppInfo();
  const auth = useAuth();
  const threadId = appContext?.threadId;
  const [isDone, setIsDone] = useState(false);
  const [threadOutcome, setThreadOutcome] = useState<ThreadOutcome>(
    ThreadOutcome.UNKNOWN
  );
  const [finalTC, setFinalTC] = useState<number | undefined>();
  const [messages, setMessages] = useState<IWebMessage[]>([]);
  const intervalId = useRef(0);

  const messagesLengthRef = useRef(0);

  useEffect(() => {
    messagesLengthRef.current = messages.length;
  }, [messages.length]);

  const sendMessage = useCallback(
    (msg: string) => {
      const uid = auth.user?.uid;
      if (!threadId || !uid) return;
      sendThreadMessage(threadId, msg, uid);
    },
    [auth.user?.uid, threadId]
  );

  useEffect(() => {
    intervalId.current = window.setInterval(async () => {
      if (isDone) {
        return;
      }
      if (!threadId) return;
      const response = await getMessages(threadId);
      if (!response) return;
      setTimeout(() => {
        setThreadOutcome(response.thread_status.outcome);
        setIsDone(response.thread_status.done);
        setFinalTC(response.thread_status.final_tc);
      }, 1000);
      const msgs = getMessagesFromApiData(response);
      if (msgs.length !== messagesLengthRef.current) {
        setMessages(msgs);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isDone, threadId]);

  return {
    sendMessage,
    messages,
    isDone,
    threadOutcome,
    finalTC,
  };
};
