import { useFadeTransition } from "../../common/useFadeTransition";
import { useThread } from "../../common/useThread";
import { animated } from "@react-spring/web";
import HR from "./HR";
import Chat from "./Chat";
import FinishedModal from "./FinishedModal";
import { useHRMood } from "../../common/useHRMood";

const Game = () => {
  const { fade, slide } = useFadeTransition();

  const { sendMessage, messages, isDone, threadOutcome, finalTC } = useThread();

  const hrMood = useHRMood(messages, isDone, threadOutcome);

  return (
    <animated.div style={slide}>
      <animated.div style={fade}>
        <div className="grid gap-5 p-5">
          <HR mood={hrMood} />
          <Chat messages={messages} sendMessage={sendMessage} isDone={isDone} />
        </div>
        <FinishedModal
          isDone={isDone}
          threadOutcome={threadOutcome}
          finalTC={finalTC}
        />
      </animated.div>
    </animated.div>
  );
};

export default Game;
