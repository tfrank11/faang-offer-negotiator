// Borrowed from: https://github.com/moonkorea00/tech-interview-GPT/blob/main/src/components/Main/hooks/useTypingEffect.ts
import { useState, useEffect } from "react";

const useTypingEffect = (value: string) => {
  const [text, setText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let i = 0;

    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setText((prev) => {
        if (i === value.length) {
          clearInterval(intervalId);

          setTimeout(() => {
            setIsAnimating(false);
          }, 2000);

          return prev;
        }
        return prev + value[i++];
      });
    }, 5);

    return () => {
      setText("");
      clearInterval(intervalId);
    };
  }, [value]);

  return { text, isAnimating };
};

export default useTypingEffect;
