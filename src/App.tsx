import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AuthProvider from "./providers/AuthProvider";
import DBProvider from "./providers/DBProvider";
import FirebaseProvider from "./providers/FirebaseProvider";
import UserInfoProvider from "./providers/UserInfoProvider";
import AppInfoProvider from "./providers/AppInfoProvider";
import AppBody from "./components/AppBody";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <DBProvider>
          <UserInfoProvider>
            <AppInfoProvider>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AppBody />
              </ThemeProvider>
            </AppInfoProvider>
          </UserInfoProvider>
        </DBProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
