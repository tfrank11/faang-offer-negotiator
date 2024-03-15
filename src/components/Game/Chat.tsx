import {
  MainContainer,
  MessageContainer,
  MessageHeader,
  MessageInput,
  MessageList,
  MinChatUiProvider,
} from "@minchat/react-chat-ui";
import { IWebMessage } from "../../common/types";
import { useMemo } from "react";

interface Props {
  messages: IWebMessage[];
  sendMessage: (val: string) => void;
  isDone: boolean;
}

const Chat: React.FC<Props> = ({ messages, sendMessage, isDone }) => {
  const minChatMessages = useMemo(() => {
    const result = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const each = messages[i];
      const isGpt = each.isGpt;
      const msg = {
        text: each.text,
        user: {
          id: isGpt ? "hr" : "you",
          name: isGpt ? "HR" : "You",
        },
      };
      result.push(msg);
    }
    return result;
  }, [messages]);

  return (
    <div className="w-2/3 mx-auto s:w-4/5">
      <MinChatUiProvider theme="#6ea9d7">
        <MainContainer style={{ height: "60vh" }}>
          <MessageContainer>
            <MessageHeader showBack={false} />
            <MessageList currentUserId="you" messages={minChatMessages} />
            <MessageInput
              onSendMessage={sendMessage}
              placeholder="Type message here"
              showSendButton={true}
              showAttachButton={false}
              disabled={isDone}
            />
          </MessageContainer>
        </MainContainer>
      </MinChatUiProvider>
    </div>
  );
};

export default Chat;
