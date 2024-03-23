import Landing from "./Landing/Landing";
import Game from "./Game/Game";
import Navbar from "./Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/game/:threadId",
    element: <Game />,
  },
  {
    path: "*",
    element: <Landing />,
  },
]);

const AppBody = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
};

export default AppBody;
