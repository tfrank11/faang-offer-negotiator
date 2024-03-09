import { Box, Dialog, Tab, Tabs, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  // MUI tabs code
  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );
  const [value, setValue] = useState(0);

  //   const login = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     loginItems.signInWithEmailAndPassword(loginEmail, loginPassword);
  //   };

  //   const signup = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     registerItems.createUserWithEmailAndPassword(signupEmail, signupPassword);
  //   };

  //   useEffect(() => {
  //     if (!isNil(authItems.user)) {
  //       handleClose();
  //     }
  //   }, [authItems.user, handleClose]);

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="h-[500px]">
          <Tabs value={value} onChange={handleChange} centered className="mt-4">
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login onClose={onClose} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup onClose={onClose} />
          </TabPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default AuthModal;
