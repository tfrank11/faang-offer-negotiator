import { Chip } from "@mui/material";
import Marquee from "react-fast-marquee";

function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ScrollingBanner = () => {
  const scores = [
    { name: "👑Bezosboy", score: 163000000 },
    { name: "Bezosboy", score: 350000 },
    { name: "Fred", score: 298000 },
    { name: "lunchballmvp", score: 281000 },
    { name: "Adam", score: 250000 },
    { name: "KMoney", score: 250000 },
    { name: "Yolo", score: 198000 },
    { name: "Eth", score: 193000 },
    { name: "yash", score: 190000 },
    { name: "haz", score: 184000 },
  ];

  return (
    <Marquee className="border-y-2 p-2 font-vt323 text-xl w-screen max-w-[100vw]">
      <div className="flex gap-10">
        <span className="my-auto ml-10">Latest High Scores: </span>
        {scores.map((e) => {
          const numWithCommas = numberWithCommas(e.score);
          return (
            <Chip
              key={`${e.name}-${e.score}`}
              label={`${e.name}: ${
                e.score > 250000 ? `🔥$${numWithCommas}🔥` : `$${numWithCommas}`
              }`}
            />
          );
        })}
      </div>
    </Marquee>
  );
};

export default ScrollingBanner;
