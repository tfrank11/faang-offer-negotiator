import React, { useMemo } from "react";
import { HRMood } from "../../common/types";

interface Props {
  mood: HRMood;
}

const HR: React.FC<Props> = ({ mood }) => {
  const imgSrc = useMemo(() => {
    switch (mood) {
      case HRMood.NORMAL_1: {
        return "normal1.png";
      }
      case HRMood.NORMAL_2: {
        return "normal2.png";
      }
      case HRMood.NORMAL_3: {
        return "normal3.png";
      }
      case HRMood.OFFER: {
        return "offer.png";
      }
      case HRMood.RESCINDED: {
        return "upset.png";
      }
    }
  }, [mood]);

  return (
    <>
      <img
        src={imgSrc}
        className="w-[33vh] mx-auto shadow-special-pink rounded-lg mb-2"
      />
    </>
  );
};

export default HR;
