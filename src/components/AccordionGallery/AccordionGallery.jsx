import { useState } from "react";
import "./AccordionGallery.css";

const AccordionGallery = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="accordion-gallery">

        <div className="accordion-gallery__items">

          {items.map((item, index) => (
            <div
              key={index}
              className={`accordion-gallery__item ${
                index === activeIndex
                  ? "accordion-gallery__item--active"
                  : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={item.image}
                alt={item.alt || `Project ${index + 1}`}
                draggable="false"
              />

              <div className="accordion-gallery__overlay">

                <div className="accordion-gallery__number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="accordion-gallery__info">

                  <span className="accordion-gallery__category">
                    UI PROJECT
                  </span>

                  <h3>
                    {item.title || "UI SIPANTES"}
                  </h3>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightboxImage(item.image);
                    }}
                  >
                    Open Image →
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        <div className="accordion-gallery__caption">

          <div>
            <span className="accordion-gallery__caption-label">
              CURRENT PROJECT
            </span>

            <h3>
              {items[activeIndex]?.title || "UI SIPANTES"}
            </h3>
          </div>

          <p>
            {items[activeIndex]?.description ||
              "Desain antarmuka pengguna untuk project SIPANTES."}
          </p>

        </div>

      </div>

      {lightboxImage && (
        <div
          className="accordion-lightbox"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            className="accordion-lightbox__close"
            onClick={() => setLightboxImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={lightboxImage}
            alt="Project preview"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default AccordionGallery;