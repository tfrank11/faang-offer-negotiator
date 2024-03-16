import { useAppInfo } from "../providers/AppInfoProvider";
import { AppPage } from "../common/types";
import Landing from "./Landing/Landing";
import Game from "./Game/Game";
import Navbar from "./Navbar";

const AppBody = () => {
  const appInfo = useAppInfo();
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar />
      {appInfo?.page === AppPage.LANDING && <Landing />}
      {appInfo?.page === AppPage.GAME && <Game />}
    </div>
  );
};

export default AppBody;
