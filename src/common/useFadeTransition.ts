import { useSpring } from "@react-spring/web";

export const useFadeTransition = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });
  const slide = useSpring({
    from: { transform: "translate3d(0, -100px, -50px)" },
    to: { transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });
  return { fade, slide };
};

export const useMessageFadeInTransition = (startFrom: "left" | "right") => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 100,
  });
  const slide = useSpring({
    from: {
      transform: `translate3d(${
        startFrom === "right" ? "100px" : "-100px"
      }, 0, 0)`,
    },
    to: { transform: "translate3d(0, 0, 0)" },
    delay: 50,
  });
  return { fade, slide };
};
