import { useEffect, useMemo, useState } from "react";
import { useFadeTransition } from "../../common/useFadeTransition";
import { useThread } from "../../common/useThread";
import { animated } from "@react-spring/web";
import { HRMood } from "../../common/types";
import { getRandomNormalHRMood } from "../../common/utils";
import HR from "./HR";
import Chat from "./Chat";
import { debounce } from "lodash";
import FinishedModal from "./FinishedModal";

const Game = () => {
  const [hrMood, setHrMood] = useState<HRMood>(HRMood.NORMAL_1);

  const { fade, slide } = useFadeTransition();

  const { sendMessage, messages, isDone, threadOutcome, finalTC } = useThread();

  const debouncedSetHRMood = debounce(setHrMood, 1000);

  const messagesDivBy2 = useMemo(() => {
    return Math.floor(messages.length % 2);
  }, [messages.length]);

  useEffect(() => {
    if (!isDone && messagesDivBy2 > 1) {
      const nextMood = getRandomNormalHRMood();
      debouncedSetHRMood(nextMood);
    }
  }, [messagesDivBy2]);

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
