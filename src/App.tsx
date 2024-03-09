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
import { AppPage } from "./common/types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const app = initializeApp(firebaseConfig);

export const AuthContext = createContext<Auth | undefined>(undefined);
export const SetPageContext = createContext<
  ((val: AppPage) => void) | undefined
>(undefined);

function App() {
  const [page, setPage] = useState(AppPage.LANDING);
  const auth = getAuth(app);

  const setPageContextValue = useMemo(() => {
    return setPage;
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      setPage(AppPage.LANDING);
    }
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={auth}>
      <SetPageContext.Provider value={setPageContextValue}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="h-screen w-screen bg-black">
            <Navbar />
            {page === AppPage.LANDING && <Landing />}
            {page === AppPage.GAME && <Game />}
          </div>
        </ThemeProvider>
      </SetPageContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
