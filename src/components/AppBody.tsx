import Home from "./Home/Home";
import Navbar from "./Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/:threadId",
    element: <Home />,
  },
  {
    path: "*",
    element: <Home />,
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
