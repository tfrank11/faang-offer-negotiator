import { useCallback, useState } from "react";
import { MonetizationOn } from "@mui/icons-material";
import { ExitToApp } from "@mui/icons-material";
import { Button, Chip, IconButton } from "@mui/material";
import AuthModal from "./AuthModal/AuthModal";
import { useAuth } from "../common/useAuth";

const Navbar = () => {
  const auth = useAuth();
  const user = auth.user;
  const [tokens, setTokens] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

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
          <Button
            variant="contained"
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
          >
            Login
          </Button>
        )}
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Navbar;
