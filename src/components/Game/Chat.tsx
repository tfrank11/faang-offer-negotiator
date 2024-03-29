import { IWebMessage } from "../../common/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import { Button, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      if (isDone) {
        return;
      }
      setOptimisticLastMessage(text);
      sendMessage(text);
      setText("");
    },
    [isDone, sendMessage, text]
  );

  useEffect(() => {
    setOptimisticLastMessage(undefined);
  }, [messages]);

  const messagesForDisplay = useMemo(() => {
    const result = messages.slice().reverse();
    return result;
  }, [messages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messagesForDisplay, optimisticLastMessage]);

  const messageRef = useRef<HTMLDivElement | null>(null);

  const onClickTryAgain = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="h-[60vh] w-full md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:1/2 mx-auto rounded-2xl bg-gray-600 p-3 pr-1 grid border-2 border-gray-500">
      <div
        className="h-[50vh] grid gap-2 auto-rows-min overflow-auto scroll-smooth no-scrollbar"
        id="messages-list"
      >
        {messagesForDisplay?.map((e, i) => {
          const isLastUserMessage =
            !e.isGpt && i === messagesForDisplay.length - 1;
          const isFirstUserMessage = !e.isGpt && i === 0;
          return (
            <Message
              message={e}
              key={e.id}
              suppressAnimate={isLastUserMessage && !isFirstUserMessage}
            />
          );
        })}
        {optimisticLastMessage && (
          <Message
            message={{
              text: optimisticLastMessage,
              id: "latest",
              isGpt: false,
            }}
          />
        )}
        <div ref={messageRef}></div>
      </div>
      {isDone ? (
        <Button
          variant="contained"
          className="w-fit !mx-auto"
          onClick={onClickTryAgain}
        >
          Try again
        </Button>
      ) : (
        <form
          className="w-full h-[6vh] mx-auto flex"
          onSubmit={onSubmitMessage}
        >
          <TextField
            className="w-full rounded-md "
            value={text}
            onChange={onChangeTextInput}
            color="secondary"
            autoComplete="off"
            disabled={isDone}
          />
          <IconButton type="submit" className="my-auto" disabled={isDone}>
            <Send />
          </IconButton>
        </form>
      )}
    </div>
  );
};

export default Chat;
