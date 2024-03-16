import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IWebMessage, ThreadOutcome } from "./types";
import { getMessages, sendThreadMessage } from "./api";
import { getMessagesFromApiData } from "./utils";
import { AppContext } from "../App";

interface IUseThreadData {
  sendMessage: (message: string) => void;
  messages: IWebMessage[];
  isDone: boolean;
  threadOutcome: ThreadOutcome;
  finalTC?: number;
}

export const useThread = (): IUseThreadData => {
  const appContext = useContext(AppContext);
  const threadId = appContext?.threadId;
  const [isDone, setIsDone] = useState(false);
  const [threadOutcome, setThreadOutcome] = useState<ThreadOutcome>(
    ThreadOutcome.UNKNOWN
  );
  const [finalTC, setFinalTC] = useState<number | undefined>();
  const [messages, setMessages] = useState<IWebMessage[]>([]);
  const intervalId = useRef(0);

  const sendMessage = useCallback(
    (msg: string) => {
      if (!threadId) return;
      sendThreadMessage(threadId, msg);
    },
    [threadId]
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
      if (msgs.length !== messages.length) {
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
