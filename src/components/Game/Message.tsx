import React from "react";

interface Props {
  text: string;
  isGpt: boolean;
}

const GPTMessage: React.FC<{ text: string }> = ({ text }) => {
  // const { text: typingText } = useTypingEffect(text);
  return (
    <div className="w-2/3 bg-gray-800 rounded-xl text-sm p-2 h-fit">
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
};

const UserMessage: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="w-2/3 bg-blue-600 rounded-xl text-sm p-2 h-fit mr-0 ml-auto">
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
};

const Message: React.FC<Props> = ({ text, isGpt }) => {
  return isGpt ? <GPTMessage text={text} /> : <UserMessage text={text} />;
};

export default Message;
