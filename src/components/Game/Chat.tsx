import { IWebMessage } from "../../common/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThreadInfo } from "../../common/useThreadInfo";
import { createAndUnlockThread } from "../../common/api";
import { useAuth } from "../../common/useAuth";
import { LoadingButton } from "@mui/lab";
import { checkIfPlayable } from "../../common/utils";

interface Props {
  messages: IWebMessage[];
  sendMessage: (val: string) => void;
}

const Chat: React.FC<Props> = ({ messages, sendMessage }) => {
  const auth = useAuth();
  const [optimisticLastMessage, setOptimisticLastMessage] = useState<
    string | undefined
  >(undefined);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [isTryAgainButtonLoading, setIsTryAgainButtonLoading] = useState(false);

  const { isDisabled, isDemoDone, isUnlocked, threadUserUid } = useThreadInfo();

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
    return result;
  }, [messages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messagesForDisplay, optimisticLastMessage]);

  const messageRef = useRef<HTMLDivElement | null>(null);

  const onClickTryAgain = useCallback(async () => {
    if (!auth.user?.uid) {
      navigate("/");
      return;
    }
    setIsTryAgainButtonLoading(true);
    const response = await createAndUnlockThread(auth.user.uid);
    if (response?.threadId) {
      setIsTryAgainButtonLoading(false);
      navigate(`/${response.threadId}`);
    }
  }, [auth.user?.uid, navigate]);

  const isPlayable = useMemo(() => {
    return checkIfPlayable(
      isDisabled,
      isDemoDone,
      isUnlocked,
      threadUserUid,
      auth.user?.uid ?? "-"
    );
  }, [auth.user?.uid, isDemoDone, isDisabled, isUnlocked, threadUserUid]);

  return (
    <div className="h-[55vh] w-11/12 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:1/2 mx-auto rounded-2xl bg-gray-600 p-2 pr-1 grid border-2 border-gray-500">
      <div
        className="h-[calc(55vh-100px)] grid gap-2 auto-rows-min overflow-auto scroll-smooth no-scrollbar"
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
      {isDisabled ? (
        <LoadingButton
          variant="contained"
          className="w-fit !mx-auto"
          onClick={onClickTryAgain}
          loading={isTryAgainButtonLoading}
        >
          Try again (1 Token)
        </LoadingButton>
      ) : (
        <form
          className="w-full h-[6vh] mx-auto flex"
          onSubmit={onSubmitMessage}
        >
          {!isPlayable ? (
            <TextField
              className="w-full rounded-md mui-text-field-hack"
              value={"🔒🔒🔒"}
              color="error"
              autoComplete="off"
              disabled={true}
            />
          ) : (
            <TextField
              className="w-full rounded-md"
              value={text}
              onChange={onChangeTextInput}
              color="secondary"
              autoComplete="off"
            />
          )}
          <IconButton type="submit" className="my-auto" disabled={!isPlayable}>
            <Send />
          </IconButton>
        </form>
      )}
    </div>
  );
};

export default Chat;
