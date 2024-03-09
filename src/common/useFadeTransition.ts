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
