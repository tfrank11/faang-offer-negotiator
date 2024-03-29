import { useEffect, useState } from "react";
import { IWebMessage } from "../../common/types";
import Message from "../Game/Message";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

interface Props {
  hideMessageForm?: boolean;
}

const DemoChat: React.FC<Props> = ({ hideMessageForm }) => {
  const [messages, setMessages] = useState<IWebMessage[]>([
    {
      text: "What's the comp for my offer?",
      isGpt: false,
      id: "1111",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setMessages((prev) => {
        return [
          ...prev,
          {
            text: `Congratulations! On behalf of my colleagues at FAANG, we are so excited to offer you a position. Your total compensation for the offer is as follows:
                - Base salary: 120k
                - Stocks vesting over 4 years: 80k
                - Annual bonus: 8k
                
                Total Compensation: 148k
                
                Do you accept this offer?`,
            isGpt: true,
            id: "2222",
          },
        ];
      });
    }, 1500);
  }, []);

  return (
    <div className="h-[40vh] w-full md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:1/2 mx-auto rounded-2xl bg-gray-600 p-3 pr-1 grid border-2 border-gray-500 my-5">
      <div
        className={`grid gap-2 auto-rows-min overflow-auto scroll-smooth no-scrollbar ${
          hideMessageForm ? "h-[37vh]" : "h-[30vh]"
        }`}
        id="messages-list"
      >
        {messages.map((e) => {
          return <Message message={e} key={e.id} />;
        })}
      </div>
      {!hideMessageForm && (
        <div className="w-full h-[6vh] mx-auto flex">
          <TextField
            value={"You have 0 tokens... get more to play!"}
            disabled
            className="w-full rounded-md "
            color="secondary"
            autoComplete="off"
          />
          <IconButton type="submit" className="my-auto" disabled>
            <Send />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default DemoChat;
