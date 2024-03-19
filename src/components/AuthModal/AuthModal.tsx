import { Box, Dialog, Tab, Tabs } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAppInfo } from "../../providers/AppInfoProvider";

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
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const AuthModal: React.FC = () => {
  const appContext = useAppInfo();
  const isOpen = useMemo(
    () => appContext?.isAuthModalOpen ?? false,
    [appContext?.isAuthModalOpen]
  );
  const onClose = useCallback(() => {
    appContext?.setIsAuthModalOpen(false);
  }, [appContext]);
  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );
  const [value, setValue] = useState(0);

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
