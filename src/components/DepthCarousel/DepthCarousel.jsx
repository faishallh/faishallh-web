import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./DepthCarousel.css";

const DepthCarousel = ({
  items = [],
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  autoplay = false,
  loop = false,
}) => {
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const currentIndex = useRef(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current || items.length === 0) {
      return;
    }

    const cards = cardsRef.current;

    const updateCards = () => {
      cards.forEach((card, index) => {
        if (!card) {
          return;
        }

        let offset =
          index - currentIndex.current;

        if (loop) {
          const total = items.length;

          if (offset > total / 2) {
            offset -= total;
          }

          if (offset < -total / 2) {
            offset += total;
          }
        }

        const absoluteOffset =
          Math.abs(offset);

        if (
          absoluteOffset >
          visibleCards
        ) {
          gsap.set(card, {
            opacity: 0,
            pointerEvents: "none",
          });

          return;
        }

        const direction =
          tiltDirection === "left"
            ? -1
            : 1;

        const x =
          offset * spread;

        const z =
          -absoluteOffset * depth;

        const rotation =
          offset *
          tilt *
          direction;

        const scale = Math.max(
          1 -
            absoluteOffset *
              falloff,
          0.4
        );

        const opacity = Math.max(
          1 -
            absoluteOffset *
              0.18,
          0
        );

        const blurAmount = Math.min(
          absoluteOffset * blur,
          blur * visibleCards
        );

        gsap.to(card, {
          x,
          z,
          rotateY: rotation,
          scale,
          opacity,
          filter: `blur(${blurAmount}px)`,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });

        card.style.pointerEvents =
          offset === 0
            ? "auto"
            : "none";
      });
    };

    const handleWheel = (event) => {
      event.preventDefault();

      if (event.deltaY > 0) {
        currentIndex.current += 1;
      } else {
        currentIndex.current -= 1;
      }

      if (loop) {
        currentIndex.current =
          (currentIndex.current +
            items.length) %
          items.length;
      } else {
        currentIndex.current =
          Math.max(
            0,
            Math.min(
              currentIndex.current,
              items.length - 1
            )
          );
      }

      updateCards();
    };

    const handleKeyDown = (event) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        currentIndex.current += 1;
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        currentIndex.current -= 1;
      }

      if (loop) {
        currentIndex.current =
          (currentIndex.current +
            items.length) %
          items.length;
      } else {
        currentIndex.current =
          Math.max(
            0,
            Math.min(
              currentIndex.current,
              items.length - 1
            )
          );
      }

      updateCards();
    };

    const handleClick = (event) => {
      const clickedCard =
        event.target.closest(
          ".depth-carousel__card"
        );

      if (!clickedCard) {
        return;
      }

      const clickedIndex = Number(
        clickedCard.dataset.index
      );

      if (
        Number.isNaN(clickedIndex)
      ) {
        return;
      }

      currentIndex.current =
        clickedIndex;

      updateCards();
    };

    updateCards();

    const carousel =
      carouselRef.current;

    carousel.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    carousel.addEventListener(
      "click",
      handleClick
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    if (
      autoplay &&
      items.length > 1
    ) {
      autoplayRef.current =
        setInterval(() => {
          currentIndex.current += 1;

          if (loop) {
            currentIndex.current =
              currentIndex.current %
              items.length;
          } else if (
            currentIndex.current >=
            items.length
          ) {
            currentIndex.current = 0;
          }

          updateCards();
        }, 3000);
    }

    return () => {
      carousel.removeEventListener(
        "wheel",
        handleWheel
      );

      carousel.removeEventListener(
        "click",
        handleClick
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      if (autoplayRef.current) {
        clearInterval(
          autoplayRef.current
        );
      }

      gsap.killTweensOf(cards);
    };
  }, [
    items,
    depth,
    spread,
    tilt,
    tiltDirection,
    perspective,
    visibleCards,
    falloff,
    blur,
    autoplay,
    loop,
  ]);

  return (
    <div
      ref={carouselRef}
      className="depth-carousel"
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <div className="depth-carousel__track">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(element) => {
              cardsRef.current[index] =
                element;
            }}
            className="depth-carousel__card"
            data-index={index}
          >
            <img
              src={item.image}
              alt={
                item.alt ||
                `Project ${index + 1}`
              }
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepthCarousel;