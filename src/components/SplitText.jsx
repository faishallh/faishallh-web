import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function SplitText({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  from = {
    opacity: 0,
    y: 40,
  },
  to = {
    opacity: 1,
    y: 0,
  },
  onLetterAnimationComplete,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const letters = container.querySelectorAll(".split-letter");

    gsap.set(letters, from);

    const animation = gsap.to(letters, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      onComplete: onLetterAnimationComplete,
    });

    return () => {
      animation.kill();
    };
  }, [
    delay,
    duration,
    ease,
    from,
    to,
    onLetterAnimationComplete,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label={text}
    >
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="split-letter"
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
}

export default SplitText;