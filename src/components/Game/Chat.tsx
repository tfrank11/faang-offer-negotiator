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
      sendMessage(text);
      setText("");
    },
    [sendMessage, text]
  );

  const reversedMessages = useMemo(() => {
    return messages.slice().reverse();
  }, [messages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [reversedMessages]);

  const messageRef = useRef<any>();

  return (
    <div className="h-[60vh] w-2/3 mx-auto rounded-2xl s:w-4/5 bg-gray-600 p-3">
      <div
        className="h-[50vh] grid gap-2 auto-rows-min overflow-auto scroll-smooth"
        id="messages-list"
      >
        {reversedMessages.map((e) => {
          return <Message text={e.text} isGpt={e.isGpt} />;
        })}
        <div ref={messageRef}></div>
      </div>
      <form
        className="w-2/3 absolute bottom-[35px] mx-auto pr-[55px] flex"
        onSubmit={onSubmitMessage}
      >
        <TextField
          className="w-full rounded-md "
          value={text}
          onChange={onChangeTextInput}
          color="secondary"
          autoComplete="off"
        />
        <IconButton type="submit">
          <Send />
        </IconButton>
      </form>
    </div>
  );
};

export default Chat;
