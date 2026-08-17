import { useEffect, useRef, useState } from "react";
import "./DecryptedText.css";

const defaultCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function DecryptedText({
  text = "",
  speed = 50,
  maxIterations = 10,
  characters = defaultCharacters,
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  revealDirection = "start",
  clickMode = "toggle",
  sequential = true,
  useOriginalCharsOnly = false,
  onComplete,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const animationRef = useRef(null);
  const iterationRef = useRef(0);
  const revealedRef = useRef(
    Array.from({ length: text.length }, () => false)
  );

  const getRandomCharacter = (originalCharacter) => {
    if (useOriginalCharsOnly) {
      const availableCharacters = originalCharacter;

      if (!availableCharacters) {
        return originalCharacter;
      }

      return availableCharacters;
    }

    if (!characters.length) {
      return originalCharacter;
    }

    return characters[
      Math.floor(Math.random() * characters.length)
    ];
  };

  const getRevealOrder = () => {
    const length = text.length;
    const indexes = Array.from(
      { length },
      (_, index) => index
    );

    if (revealDirection === "end") {
      return indexes.reverse();
    }

    if (revealDirection === "center") {
      const center = Math.floor(length / 2);

      return indexes.sort(
        (a, b) =>
          Math.abs(a - center) -
          Math.abs(b - center)
      );
    }

    if (revealDirection === "random") {
      return indexes.sort(
        () => Math.random() - 0.5
      );
    }

    return indexes;
  };

  const startAnimation = () => {
    if (isAnimating || !text) {
      return;
    }

    setIsAnimating(true);
    iterationRef.current = 0;

    revealedRef.current = Array.from(
      { length: text.length },
      () => false
    );

    const revealOrder = getRevealOrder();

    const animate = () => {
      const iteration = iterationRef.current;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsAnimating(false);
        setIsRevealed(true);

        if (onComplete) {
          onComplete();
        }

        return;
      }

      const progress = iteration / maxIterations;

      const revealCount = Math.floor(
        progress * text.length
      );

      revealOrder.forEach((index, orderIndex) => {
        if (orderIndex < revealCount) {
          revealedRef.current[index] = true;
        }
      });

      const nextText = text
        .split("")
        .map((character, index) => {
          if (
            character === " " ||
            revealedRef.current[index]
          ) {
            return character;
          }

          return getRandomCharacter(character);
        })
        .join("");

      setDisplayText(nextText);

      iterationRef.current += 1;

      animationRef.current = setTimeout(
        animate,
        speed
      );
    };

    animate();
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setDisplayText(text);
    setIsAnimating(false);
    setIsRevealed(false);
    iterationRef.current = 0;

    revealedRef.current = Array.from(
      { length: text.length },
      () => false
    );
  };

  useEffect(() => {
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            entry.isIntersecting &&
            !isRevealed
          ) {
            startAnimation();
          }
        },
        {
          threshold: 0.1,
        }
      );

      const element =
        animationElementRef.current;

      if (element) {
        observer.observe(element);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [animateOn, isRevealed]);

  const animationElementRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === "hover") {
      resetAnimation();
    }
  };

  const handleClick = () => {
    if (animateOn !== "click") {
      return;
    }

    if (clickMode === "toggle" && isRevealed) {
      resetAnimation();
      return;
    }

    startAnimation();
  };

  const classes = [
    "decrypted-text",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const parentClasses = [
    "decrypted-text-parent",
    parentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      ref={animationElementRef}
      className={parentClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={
        animateOn === "click"
          ? "button"
          : undefined
      }
      tabIndex={
        animateOn === "click"
          ? 0
          : undefined
      }
    >
      <span
        className={
          isAnimating
            ? `${classes} ${encryptedClassName}`
            : classes
        }
      >
        {displayText}
      </span>
    </span>
  );
}

export default DecryptedText;