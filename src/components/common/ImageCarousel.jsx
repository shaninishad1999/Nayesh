import React, { useEffect, useRef, useState } from "react";
import img1 from "../../assets/crousalImg/1.jpg";
import img2 from "../../assets/crousalImg/2.jpg";
import img3 from "../../assets/crousalImg/3.jpg";

// Smooth, touch-enabled slider adapted from your original component.
// Drop this file into the same folder and import/replace your previous ImageCarousel.
// Notes: It keeps your headings/subheadings split logic and styling but changes the DOM structure
// to a true sliding layout (horizontal track). No external library required.

const ImageCarousel = () => {
  const images = [
    {
      src: img1,
      alt: "Beautiful landscape 1",
      heading: "The Balcony",
      subheadingRows: ["Where you'll sip your moments", "together, every day."],
    },
    {
      src: img2,
      alt: "Beautiful landscape 2",
      heading: "The Couch",
      subheadingRows: ["Where friends turn into family."],
    },
    {
      src: img3,
      alt: "Beautiful landscape 3",
      heading: "The Corner",
      subheadingRows: ["That feels like it's only yours."],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const touch = useRef({ startX: 0, currentX: 0, dragging: false });

  // Split heading helper (keeps from your original file)
  const splitHeading = (heading) => {
    const words = heading.split(" ");
    const firstWord = words[0];
    const remainingWords = words.slice(1).join(" ");
    return { firstWord, remainingWords };
  };

  // Autoplay: advance every 5s. Pause while dragging or on hover.
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % images.length);
    }, 5000);
  };
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    // allow CSS transition to finish then clear transitioning flag
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Touch / mouse drag handlers for swipe
  const handleTouchStart = (e) => {
    stopAutoplay();
    touch.current.dragging = true;
    touch.current.startX = e.touches ? e.touches[0].clientX : e.clientX;
    touch.current.currentX = touch.current.startX;
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const handleTouchMove = (e) => {
    if (!touch.current.dragging) return;
    touch.current.currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = touch.current.currentX - touch.current.startX;
    const percentage = (dx / window.innerWidth) * 100;
    const base = -currentIndex * 100;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${base + percentage}%)`;
  };

  const handleTouchEnd = () => {
    if (!touch.current.dragging) return;
    touch.current.dragging = false;
    const dx = touch.current.currentX - touch.current.startX;
    const threshold = window.innerWidth * 0.15; // swipe threshold
    if (dx > threshold) {
      goToSlide(Math.max(0, currentIndex - 1));
    } else if (dx < -threshold) {
      goToSlide(Math.min(images.length - 1, currentIndex + 1));
    } else {
      // snap back to current
      if (trackRef.current) {
        trackRef.current.style.transition = "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)";
        trackRef.current.style.transform = `translateX(${-currentIndex * 100}%)`;
      }
    }
    startAutoplay();
  };

  useEffect(() => {
    // ensure track is positioned when currentIndex changes
    if (trackRef.current && !touch.current.dragging) {
      trackRef.current.style.transition = "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)";
      trackRef.current.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const { firstWord, remainingWords } = splitHeading(images[currentIndex].heading);
  const subheadingRows =
    images[currentIndex].subheadingRows && images[currentIndex].subheadingRows.length > 0
      ? images[currentIndex].subheadingRows
      : images[currentIndex].subheading
      ? [images[currentIndex].subheading]
      : [];

  return (
    <>
      <div
        className="relative w-full h-screen overflow-hidden"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {/* Sliding track */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex w-[300%]" /* 3 slides -> 300% */
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e) => {
            e.preventDefault();
            handleTouchStart(e);
            window.addEventListener("mousemove", handleTouchMove);
            window.addEventListener("mouseup", () => {
              window.removeEventListener("mousemove", handleTouchMove);
              handleTouchEnd();
            }, { once: true });
          }}
          style={{ transform: `translateX(${-currentIndex * 100}%)`, transition: "transform 700ms cubic-bezier(0.2,0.8,0.2,1)" }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full flex-shrink-0 h-full relative">
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out transform ${
                  idx === currentIndex ? "scale-100" : "scale-105"
                }`}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        {/* Heading & Subheading (keeps your positioning, adjusted to be on top of slider) */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <div className="text-right w-full max-w-7xl  flex flex-col items-end -space-y-2 sm:-space-y-4 md:-space-y-8">
            <h1
              className={`text-white font-gotham uppercase tracking-wide transition-all duration-700 ease-out transform pointer-events-auto ${
                isTransitioning ? "translate-x-full opacity-0" : "translate-x-0 opacity-100 animate-slideInRight"
              } text-7xl sm:text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[12rem] 2xl:text-[14rem]`}
            >
              {firstWord}
            </h1>

            {remainingWords && (
              <h1
                className={`text-white font-gotham leading-none tracking-wide uppercase transition-all duration-700 ease-out transform pointer-events-auto ${
                  isTransitioning ? "translate-x-full opacity-0" : "translate-x-0 opacity-100 animate-slideInRight animation-delay-200"
                } text-7xl sm:text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[12rem] 2xl:text-[14rem]`}
              >
                {remainingWords}
              </h1>
            )}

            <div className="pt-1 sm:pt-3 md:pt-4 lg:pt-5 xl:pt-6 pointer-events-auto  ">
              {subheadingRows.map((row, idx) => {
                const delayClass = idx === 0 ? "animation-delay-400" : idx === 1 ? "animation-delay-600" : `animation-delay-${400 + idx * 200}`;
                return (
                  <p
                    key={idx}
                    className={`text-white/90 font-gotham uppercase transition-all duration-700 ease-out transform pointer-events-auto ${
                      isTransitioning ? "translate-y-2 opacity-0" : `translate-y-0 opacity-100 animate-fadeInUp ${delayClass}`
                    } text-sm pr-5 sm:text-xl md:text-2xl md:pr-10 lg:text-3xl lg:pr-14 xl:text-2xl 2xl:text-4xl font-semibold leading-relaxed`}
                  >
                    {row}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20" style={{ bottom: "20px" }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 transform hover:scale-125 pointer-events-auto ${
                index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Prev/Next arrows (optional) */}
       

        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(120px) scale(0.95); }
            to { opacity: 1; transform: translateX(0) scale(1); }
          }
          .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
          .animate-slideInRight { animation: slideInRight 1s ease-out forwards; }
          .animation-delay-200 { animation-delay: 0.35s; opacity: 0; }
          .animation-delay-400 { animation-delay: 0.6s; opacity: 0; }
          .animation-delay-600 { animation-delay: 0.9s; opacity: 0; }
          .animation-delay-800 { animation-delay: 1.2s; opacity: 0; }
        `}</style>
      </div>

      {/* Footer */}
      <div className="relative w-full bg-[#333333] py-3 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-white text-center text-xs sm:text-sm md:text-lg lg:text-2xl leading-tight whitespace-normal break-words" style={{ fontFamily: "GothamLight" }}>
            ARCHITECTURE &nbsp;&nbsp;||&nbsp;&nbsp; INTERIORS &nbsp;&nbsp;||&nbsp;&nbsp; PREMIUM HOMES
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
