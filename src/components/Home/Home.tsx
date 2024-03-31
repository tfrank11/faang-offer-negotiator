import { animated } from "@react-spring/web";
import { useCallback, useState } from "react";
import { useFadeTransition } from "../../common/useFadeTransition";
import { useAuth } from "../../common/useAuth";
import { generatePaymentLink, unlockThread } from "../../common/api";
import { LoadingButton } from "@mui/lab";
import { useAppInfo } from "../../providers/AppInfoProvider";
import { useUserInfo } from "../../providers/UserInfoProvider";
import ScrollingBanner from "./ScrollingBanner";
import Game from "../Game/Game";
import { useThreadInfo } from "../../common/useThreadInfo";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const appContext = useAppInfo();
  const auth = useAuth();
  const userInfo = useUserInfo();
  const tokens = userInfo?.tokens ?? 0;
  const navigate = useNavigate();
  const [insertTokenLoading, setInsertTokenLoading] = useState(false);
  const { threadId, isUnlocked, threadUserUid } = useThreadInfo();

  const onClickInsertToken = useCallback(async () => {
    if (!auth.user?.uid || !threadId) {
      return;
    }
    setInsertTokenLoading(true);
    await unlockThread(threadId, auth.user.uid);
    setInsertTokenLoading(false);
  }, [auth.user, threadId]);

  const [isBuyTokensButtonLoading, setIsBuyTokensButtonLoading] =
    useState(false);
  const isBuyButtonALoginButton = !auth.user || isBuyTokensButtonLoading;
  const onClickBuyMoreTokens = useCallback(() => {
    if (isBuyButtonALoginButton) {
      appContext?.setIsAuthModalOpen(true);
      return;
    }
    const uid = auth.user?.uid;
    if (!uid || !threadId) {
      return;
    }
    setIsBuyTokensButtonLoading(true);

    (async () => {
      const paymentLink = await generatePaymentLink(uid, threadId);
      if (paymentLink) {
        location.href = paymentLink;
      }
      setIsBuyTokensButtonLoading(false);
    })();
  }, [appContext, auth.user?.uid, isBuyButtonALoginButton, threadId]);

  const { fade, slide } = useFadeTransition();

  const onClickRestart = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <animated.div style={slide}>
      <animated.div style={fade} className="grid gap-10">
        <div className="w-full">
          <h1 className="font-roboto mt-3 font-semibold text-purple-500 text-center text-[30px] sm:text-[30px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px]">
            GPT4 Offer Negotiation
          </h1>
          <ul className="text-center w-fit mx-auto list-carrot text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-green-500 mb-2">
            <li>You have a job offer including base, bonus, and RSUs</li>
            <li className="pl-2">
              Your goal is to negotiate the comp as high as possible
            </li>
          </ul>
          <Game />
          <div className="my-4 flex gap-2 w-fit mx-auto text-center min-h-22">
            {!isUnlocked && (
              <LoadingButton
                variant="contained"
                onClick={onClickInsertToken}
                loading={insertTokenLoading}
                disabled={tokens === 0}
              >
                Insert Token To Unlock
              </LoadingButton>
            )}
            {tokens === 0 && (
              <LoadingButton
                className="w-fit mx-auto"
                onClick={onClickBuyMoreTokens}
                variant={tokens > 0 ? "outlined" : "contained"}
                color="success"
                loading={isBuyTokensButtonLoading}
              >
                GET Tokens
              </LoadingButton>
            )}
            {auth.user?.uid &&
              threadUserUid &&
              auth.user.uid !== threadUserUid && (
                <Button
                  className="w-fit"
                  onClick={onClickRestart}
                  variant="outlined"
                  color="error"
                >
                  Reset
                </Button>
              )}
          </div>
          <ScrollingBanner />
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Landing;
