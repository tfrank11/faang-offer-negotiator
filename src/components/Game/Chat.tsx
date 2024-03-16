import { IWebMessage } from "../../common/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

interface Props {
  messages: IWebMessage[];
  sendMessage: (val: string) => void;
  isDone: boolean;
}

const Chat: React.FC<Props> = ({ messages, sendMessage, isDone }) => {
  const [optimisticLastMessage, setOptimisticLastMessage] = useState<
    string | undefined
  >(undefined);
  const [text, setText] = useState("");

  const onChangeTextInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    []
  );

  const onSubmitMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOptimisticLastMessage(text);
      sendMessage(text);
      setText("");
    },
    [sendMessage, text]
  );

  useEffect(() => {
    setOptimisticLastMessage(undefined);
  }, [messages]);

  const messagesForDisplay = useMemo(() => {
    const result = messages.slice().reverse();
    if (optimisticLastMessage) {
      result.push({
        text: optimisticLastMessage,
        isGpt: false,
      });
    }
    return result;
  }, [messages, optimisticLastMessage]);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messagesForDisplay]);

  const messageRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-[60vh] w-2/3 mx-auto rounded-2xl s:w-4/5 bg-gray-600 p-3 grid">
      <div
        className="h-[50vh] grid gap-2 auto-rows-min overflow-auto scroll-smooth"
        id="messages-list"
      >
        {messagesForDisplay.map((e) => {
          return <Message text={e.text} isGpt={e.isGpt} />;
        })}
        <div ref={messageRef}></div>
      </div>
      <form className="w-full h-[6vh] mx-auto flex" onSubmit={onSubmitMessage}>
        <TextField
          className="w-full rounded-md "
          value={text}
          onChange={onChangeTextInput}
          color="secondary"
          autoComplete="off"
          disabled={isDone}
        />
        <IconButton type="submit" className="my-auto">
          <Send />
        </IconButton>
      </form>
    </div>
  );
};

export default Chat;
