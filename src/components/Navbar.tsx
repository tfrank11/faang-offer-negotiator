import { useCallback } from "react";
import { MonetizationOn } from "@mui/icons-material";
import { ExitToApp } from "@mui/icons-material";
import { Button, Chip, IconButton } from "@mui/material";
import AuthModal from "./AuthModal/AuthModal";
import { useAuth } from "../common/useAuth";
import { useUserInfo } from "../providers/UserInfoProvider";
import { useAppInfo } from "../providers/AppInfoProvider";

const Navbar = () => {
  const appContext = useAppInfo();
  const auth = useAuth();
  const user = auth.user;
  const userInfo = useUserInfo();
  const tokens = userInfo?.tokens ?? 0;

  const onClickLogin = useCallback(() => {
    appContext?.setIsAuthModalOpen(true);
  }, [appContext]);

  return (
    <div className="w-screen bg-purple-600 h-12 box-shadow px-2 flex">
      <div className="flex my-auto ml-auto mr-0 gap-2">
        <Chip
          className="my-auto"
          label={`${tokens} Tokens`}
          variant="outlined"
          color="primary"
          icon={<MonetizationOn />}
        />
        {user ? (
          <>
            <Chip label={user.email} className="my-auto" />
            <IconButton onClick={auth.signout}>
              <ExitToApp />
            </IconButton>
          </>
        ) : (
          <Button variant="contained" onClick={onClickLogin}>
            Login
          </Button>
        )}
      </div>
      <AuthModal />
    </div>
  );
};

export default Navbar;
