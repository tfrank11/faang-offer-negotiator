import { useThread } from "../../common/useThread";
import Chat from "./Chat";
import FinishedModal from "./FinishedModal";

const Game = () => {
  const { sendMessage, messages } = useThread();

  return (
    <>
      <Chat messages={messages} sendMessage={sendMessage} />
      <FinishedModal />
    </>
  );
};

export default Game;
