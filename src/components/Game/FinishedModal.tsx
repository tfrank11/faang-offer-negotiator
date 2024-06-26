import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { ThreadOutcome } from "../../common/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isNil } from "lodash";
import { useThreadInfo } from "../../common/useThreadInfo";

function generateXMessage(threadOutcome: ThreadOutcome, finalTC?: number) {
  if (threadOutcome === ThreadOutcome.ACCEPTED && !isNil(finalTC)) {
    return `I negotiated my TC up to ${finalTC / 1000}k against GPT4 🚀🚀`;
  }
  if (threadOutcome === ThreadOutcome.RESCINDED) {
    return `I botched my negotiation and had my offer rescinded against GPT4 :(`;
  }
}

const FinishedModal: React.FC = () => {
  const { isDisabled, finalTC, threadOutcome } = useThreadInfo();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isDisabled);
  }, [isDisabled]);

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

  const canShare = useMemo(() => {
    const validations = [
      threadOutcome === ThreadOutcome.UNKNOWN,
      threadOutcome === ThreadOutcome.ACCEPTED && isNil(finalTC),
    ];
    return !validations.includes(true);
  }, [finalTC, threadOutcome]);

  const onClickShare = useCallback(() => {
    const url = location.origin;
    const text = generateXMessage(threadOutcome, finalTC ?? undefined);
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

  const onCloseHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Dialog open={isOpen} onClose={onCloseHandler}>
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
            {canShare && (
              <Button size="small" variant="outlined" onClick={onClickShare}>
                Share on X
              </Button>
            )}
            <div className="!ml-auto !mr-0">
              <Button size="small" variant="outlined" onClick={onCloseHandler}>
                Close
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </Dialog>
  );
};

export default FinishedModal;
