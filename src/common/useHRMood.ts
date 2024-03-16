import { useEffect, useMemo, useState } from "react";
import { HRMood, IWebMessage, ThreadOutcome } from "./types";
import { debounce } from "lodash";
import { getRandomNormalHRMood } from "./utils";

export const useHRMood = (
  messages: IWebMessage[],
  isDone: boolean,
  threadOutcome: ThreadOutcome
) => {
  const [hrMood, setHrMood] = useState<HRMood>(HRMood.NORMAL_1);

  const debouncedSetHRMood = debounce(setHrMood, 1000);

  const messagesDivBy2 = useMemo(() => {
    return Math.floor(messages.length % 2);
  }, [messages.length]);

  useEffect(() => {
    if (!isDone && messagesDivBy2 > 1) {
      const nextMood = getRandomNormalHRMood();
      debouncedSetHRMood(nextMood);
    }

    if (isDone && threadOutcome === ThreadOutcome.ACCEPTED) {
      setHrMood(HRMood.OFFER);
    }
    if (isDone && threadOutcome === ThreadOutcome.RESCINDED) {
      setHrMood(HRMood.RESCINDED);
    }
  }, [debouncedSetHRMood, isDone, messagesDivBy2, threadOutcome]);

  return hrMood;
};
