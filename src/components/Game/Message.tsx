import React from "react";
import { IWebMessage } from "../../common/types";
import { useMessageFadeInTransition } from "../../common/useFadeTransition";
import { animated } from "@react-spring/web";

interface Props {
  message: IWebMessage;
  suppressAnimate?: boolean;
}

const GPTMessage: React.FC<{ text: string }> = ({ text }) => {
  const { fade, slide } = useMessageFadeInTransition("left");
  return (
    <animated.div style={fade}>
      <animated.div style={slide}>
        <div className="w-2/3 bg-gray-800 rounded-xl text-sm p-2 h-fit shadow-sharp">
          <p className="whitespace-pre-line">{text}</p>
        </div>
      </animated.div>
    </animated.div>
  );
};

const UserMessage: React.FC<{ text: string; suppressAnimate?: boolean }> = ({
  text,
  suppressAnimate,
}) => {
  const { fade, slide } = useMessageFadeInTransition("right");

  const Message = (
    <div className="w-2/3 bg-blue-600 rounded-xl text-sm p-2 h-fit mr-2 ml-auto shadow-sharp">
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );

  return suppressAnimate ? (
    Message
  ) : (
    <animated.div style={fade}>
      <animated.div style={slide}>{Message}</animated.div>
    </animated.div>
  );
};

const Message: React.FC<Props> = ({ message, suppressAnimate }) => {
  return message.isGpt ? (
    <GPTMessage text={message.text} />
  ) : (
    <UserMessage text={message.text} suppressAnimate={suppressAnimate} />
  );
};

export default Message;
