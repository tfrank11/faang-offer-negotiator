import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { AppPage, ThreadOutcome } from "../../common/types";
import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "../../App";
import { isNil } from "lodash";

interface Props {
  isDone: boolean;
  threadOutcome: ThreadOutcome;
  finalTC: number | undefined;
}

function generateXMessage(threadOutcome: ThreadOutcome, finalTC: number) {
  if (threadOutcome === ThreadOutcome.ACCEPTED) {
    return `I negotiated my TC up to ${finalTC / 1000}k against a GPT4 AI 🚀🚀`;
  }
  if (threadOutcome === ThreadOutcome.RESCINDED) {
    return `I botched my negotiation and had my offer rescinded against a GPT4 AI :(`;
  }
}

const FinishedModal: React.FC<Props> = ({ isDone, threadOutcome, finalTC }) => {
  const appContext = useContext(AppContext);

  const onClickTryAgain = useCallback(() => {
    appContext?.setPage(AppPage.LANDING);
  }, [appContext]);

  const title = useMemo(() => {
    if (threadOutcome === ThreadOutcome.ACCEPTED) {
      return "Offer Accepted";
    }
    if (threadOutcome === ThreadOutcome.RESCINDED) {
      return "Offer Rescinded";
    }
    return "...";
  }, [threadOutcome]);

  const tag = useMemo(() => {
    if (threadOutcome === ThreadOutcome.ACCEPTED) {
      return "Congratulations!";
    }
    return "Uh Oh...";
  }, [threadOutcome]);

  const tcDescription = useMemo(() => {
    if (!finalTC) {
      return "";
    }
    if (threadOutcome === ThreadOutcome.ACCEPTED) {
      return `🤑 You succesfully negotiated your TC up to ${
        finalTC / 1000
      }k! 🤑`;
    }
    return "You botched the negotiation and lost your offer 😔";
  }, [finalTC, threadOutcome]);

  const onClickShare = useCallback(() => {
    if (threadOutcome === ThreadOutcome.UNKNOWN || isNil(finalTC)) return;
    const url = location.href;
    const text = generateXMessage(threadOutcome, finalTC);
    if (isNil(text)) return;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  }, [finalTC, threadOutcome]);

  return (
    <Dialog open={isDone}>
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {tag}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {title}
            </Typography>
            <Typography variant="body2">
              {tcDescription}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={onClickTryAgain}>
              Try Again
            </Button>
            <Button size="small" variant="outlined" onClick={onClickShare}>
              Share on X
            </Button>
          </CardActions>
        </Card>
      </div>
    </Dialog>
  );
};

export default FinishedModal;
