import { Chip } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { animated } from "@react-spring/web";
import { useCallback, useState } from "react";
import { useFadeTransition } from "../../common/useFadeTransition";
import { AppPage } from "../../common/types";
import { useAuth } from "../../common/useAuth";
import { createThread, generatePaymentLink } from "../../common/api";
import { LoadingButton } from "@mui/lab";
import { useAppInfo } from "../../providers/AppInfoProvider";
import { useUserInfo } from "../../providers/UserInfoProvider";

const Landing = () => {
  const appContext = useAppInfo();
  const setPage = appContext?.setPage;
  const auth = useAuth();
  const userInfo = useUserInfo();
  const tokens = userInfo?.tokens ?? 0;
  const [insertTokenLoading, setInsertTokenLoading] = useState(false);

  const onClickInsertToken = useCallback(async () => {
    if (!auth.user) {
      return;
    }
    setInsertTokenLoading(true);
    const response = await createThread(auth.user.uid);
    setInsertTokenLoading(false);
    if (response?.threadId) {
      appContext?.setThreadId(response.threadId);
      setPage?.(AppPage.GAME);
    }
  }, [appContext, auth.user, setPage]);

  const [isBuyTokensButtonLoading, setIsBuyTokensButtonLoading] =
    useState(false);
  const isBuyButtonALoginButton = !auth.user || isBuyTokensButtonLoading;
  const onClickBuyMoreTokens = useCallback(() => {
    if (isBuyButtonALoginButton) {
      appContext?.setIsAuthModalOpen(true);
      return;
    }
    const uid = auth.user?.uid;
    if (!uid) {
      return;
    }
    setIsBuyTokensButtonLoading(true);

    (async () => {
      const paymentLink = await generatePaymentLink(uid);
      if (paymentLink) {
        location.href = paymentLink;
      }
      setIsBuyTokensButtonLoading(false);
    })();
  }, [appContext, auth.user?.uid, isBuyButtonALoginButton]);

  const { fade, slide } = useFadeTransition();

  return (
    <animated.div style={slide}>
      <animated.div style={fade}>
        <div className="w-full text-center">
          <h1 className="font-roboto text-[40px] mt-10 font-semibold text-purple-500">
            GPT4 FAANG Offer Negotiation
          </h1>
          <h3 className="italic text-[20px]">
            🚀How high can you negotiate your TC?🚀
          </h3>
          <img
            src="hr-manager-skills.jpg"
            className="w-1/2 mx-auto my-2 shadow-special-pink rounded-lg"
          />

          <div className="mt-10 grid gap-2 w-fit mx-auto">
            <LoadingButton
              variant="contained"
              onClick={onClickInsertToken}
              loading={insertTokenLoading}
              disabled={tokens === 0}
            >
              Insert Token To Play
            </LoadingButton>
            {tokens === 0 && (
              <Chip
                className="w-fit mx-auto"
                label="No tokens!"
                icon={<WarningAmberIcon />}
                color="error"
              />
            )}
            <div>
              <LoadingButton
                className="w-fit mx-auto"
                onClick={onClickBuyMoreTokens}
                variant={tokens > 0 ? "outlined" : "contained"}
                color="success"
                loading={isBuyTokensButtonLoading}
              >
                Buy More
              </LoadingButton>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Landing;
