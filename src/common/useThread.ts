import { useCallback, useEffect, useRef, useState } from "react";
import { IWebMessage } from "./types";
import { getMessages, sendThreadDemoMessage, sendThreadMessage } from "./api";
import { getMessagesFromApiData } from "./utils";
import { useAuth } from "./useAuth";
import { useThreadInfo } from "./useThreadInfo";
import { useStartThread } from "./useStartThread";

export const useThread = () => {
  const auth = useAuth();
  const { threadId, isDemoDone, isDisabled, isUnlocked } = useThreadInfo();
  const { startThread } = useStartThread();
  const [messages, setMessages] = useState<IWebMessage[]>([]);
  const intervalId = useRef(0);

  const messagesLengthRef = useRef(0);
  const prevThreadId = useRef("");

  useEffect(() => {
    if (!threadId) {
      startThread();
    } else if (!prevThreadId.current) {
      prevThreadId.current = threadId;
    } else if (prevThreadId.current !== threadId) {
      setMessages([]);
    }
  }, [startThread, threadId]);

  useEffect(() => {
    messagesLengthRef.current = messages.length;
  }, [messages.length]);

  const sendMessage = useCallback(
    (msg: string) => {
      const uid = auth.user?.uid;
      if (!!uid && isUnlocked && threadId) {
        sendThreadMessage(threadId, msg, uid);
      } else if (!isDemoDone && !isUnlocked && threadId) {
        sendThreadDemoMessage(threadId, msg);
      }
    },
    [auth.user?.uid, isDemoDone, isUnlocked, threadId]
  );

  useEffect(() => {
    intervalId.current = window.setInterval(async () => {
      if (!threadId || isDisabled) return;
      const response = await getMessages(threadId);
      if (!response) return;
      const msgs = getMessagesFromApiData(response);
      if (msgs.length !== messagesLengthRef.current) {
        setMessages(msgs);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, [auth.user?.uid, isDisabled, threadId]);

  return {
    sendMessage,
    messages,
  };
};
