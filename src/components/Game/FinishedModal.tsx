import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { ThreadOutcome } from "../../common/types";
import { useMemo } from "react";

interface Props {
  isDone: boolean;
  threadOutcome: ThreadOutcome;
  finalTC: number | undefined;
}

const FinishedModal: React.FC<Props> = ({ isDone, threadOutcome, finalTC }) => {
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
            <Button size="small">Share on X</Button>
          </CardActions>
        </Card>
      </div>
    </Dialog>
  );
};

export default FinishedModal;
