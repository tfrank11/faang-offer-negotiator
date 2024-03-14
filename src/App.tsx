import { initializeApp } from "firebase/app";
import { ThemeProvider, createTheme } from "@mui/material";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { firebaseConfig } from "./firebaseConfig";
import { Auth, getAuth } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import Game from "./components/Game/Game";
import { AppPage, IAppContext, IUserInfo } from "./common/types";
import { useGetUserInfo } from "./common/useGetUserInfo";
import { Firestore, getFirestore } from "firebase/firestore";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const AuthContext = createContext<Auth | undefined>(undefined);
export const AppContext = createContext<IAppContext | undefined>(undefined);
export const UserInfoContext = createContext<IUserInfo | undefined>(undefined);
export const DBContext = createContext<Firestore>(db);

function App() {
  const auth = getAuth(app);
  const userInfo = useGetUserInfo(auth.currentUser?.uid);

  const [page, setPage] = useState(AppPage.LANDING);
  const [threadId, setThreadId] = useState("");

  const appContextValue = useMemo(() => {
    return {
      setPage,
      threadId,
      setThreadId,
    };
  }, [threadId]);

  useEffect(() => {
    if (!auth.currentUser) {
      setPage(AppPage.LANDING);
    }
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={auth}>
      <DBContext.Provider value={db}>
        <UserInfoContext.Provider value={userInfo}>
          <AppContext.Provider value={appContextValue}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <div className="h-screen w-screen bg-black">
                <Navbar />
                {page === AppPage.LANDING && <Landing />}
                {page === AppPage.GAME && <Game />}
              </div>
            </ThemeProvider>
          </AppContext.Provider>
        </UserInfoContext.Provider>
      </DBContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
