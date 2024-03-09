import { useState } from "react";
import { useFadeTransition } from "../../common/useFadeTransition";
import { animated } from "@react-spring/web";
import { GameState, HRMood } from "../../common/types";
import HR from "./HR";

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  const [hrMood, setHrMood] = useState<HRMood>(HRMood.NORMAL_1);

  const { fade, slide } = useFadeTransition();

  return (
    <animated.div style={slide}>
      <animated.div style={fade}>
        <HR mood={hrMood} />
      </animated.div>
    </animated.div>
  );
};

export default Game;
