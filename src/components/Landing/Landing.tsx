import { animated } from "@react-spring/web";
import { useCallback, useState } from "react";
import { useFadeTransition } from "../../common/useFadeTransition";
import { useAuth } from "../../common/useAuth";
import { createThread, generatePaymentLink } from "../../common/api";
import { LoadingButton } from "@mui/lab";
import { useAppInfo } from "../../providers/AppInfoProvider";
import { useUserInfo } from "../../providers/UserInfoProvider";
import ScrollingBanner from "./ScrollingBanner";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const appContext = useAppInfo();
  const auth = useAuth();
  const userInfo = useUserInfo();
  const tokens = userInfo?.tokens ?? 0;
  const navigate = useNavigate();
  const [insertTokenLoading, setInsertTokenLoading] = useState(false);

  const onClickInsertToken = useCallback(async () => {
    if (!auth.user) {
      return;
    }
    setInsertTokenLoading(true);
    const response = await createThread(auth.user.uid);
    setInsertTokenLoading(false);
    if (response?.threadId) {
      navigate(`/game/${response.threadId}`);
    }
  }, [auth.user, navigate]);

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
      <animated.div style={fade} className="grid gap-10">
        <div className="w-full text-center">
          <h1 className="font-roboto text-[40px] mt-10 font-semibold text-purple-500">
            GPT4 Offer Negotiation
          </h1>
          <ul className="w-fit mx-auto list-carrot text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-green-500">
            <li>You have a job offer including base, bonus, and RSUs</li>
            <li className="pl-2">
              Your goal is to negotiate the comp as high as possible
            </li>
          </ul>
          <img
            src="hr-manager-skills.jpg"
            className="w-1/3 max-w-96 min-w-64 mx-auto shadow-special-pink rounded-lg my-5"
          />

          <div className="mt-10 grid gap-2 w-fit mx-auto">
            {tokens > 0 && (
              <LoadingButton
                variant="contained"
                onClick={onClickInsertToken}
                loading={insertTokenLoading}
                disabled={tokens === 0}
              >
                Insert Token To Play
              </LoadingButton>
            )}

            <div>
              <LoadingButton
                className="w-fit mx-auto"
                onClick={onClickBuyMoreTokens}
                variant={tokens > 0 ? "outlined" : "contained"}
                color="success"
                loading={isBuyTokensButtonLoading}
              >
                GET Tokens
              </LoadingButton>
            </div>
          </div>
        </div>
        <ScrollingBanner />
      </animated.div>
    </animated.div>
  );
};

export default Landing;
