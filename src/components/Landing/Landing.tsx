import { Button, Chip } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { animated } from "@react-spring/web";
import { useCallback, useContext, useState } from "react";
import { SetPageContext } from "../../App";
import { useFadeTransition } from "../../common/useFadeTransition";
import { AppPage } from "../../common/types";
import { useAuth } from "../../common/useAuth";

const Landing = () => {
  const setPage = useContext(SetPageContext);
  const [tokens, setTokens] = useState(2);
  const auth = useAuth();

  const onClickInsertToken = useCallback(() => {
    if (!auth.user) {
      return;
    }
    // check if they have tokens
    // remove 1 token
    // start game
    if (setPage) {
      setPage(AppPage.GAME);
    }
  }, [auth.user, setPage]);

  const { fade, slide } = useFadeTransition();

  return (
    <animated.div style={slide}>
      <animated.div style={fade}>
        <div className="w-full text-center">
          <h1 className="font-roboto text-[40px] mt-10 font-semibold text-purple-500">
            GPT3 FAANG Offer Negotiation
          </h1>
          <h3 className="italic text-[20px]">
            How high can you negotiate your TC?
          </h3>
          <img
            src="hr-manager-skills.jpg"
            className="w-1/2 mx-auto my-2 shadow-special-pink rounded-lg"
          />

          <div className="mt-10 grid gap-2 w-fit mx-auto">
            <Button
              variant="contained"
              onClick={onClickInsertToken}
              disabled={tokens === 0}
            >
              Insert Token To Play
            </Button>
            {tokens === 0 && (
              <Chip
                className="w-fit mx-auto"
                label="No tokens!"
                icon={<WarningAmberIcon />}
                color="error"
              />
            )}
            <div>
              <Button
                className="w-fit mx-auto"
                variant={tokens > 0 ? "outlined" : "contained"}
                color="success"
              >
                Buy More
              </Button>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Landing;
