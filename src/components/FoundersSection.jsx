import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import markImg from "../assets/mark.png";
import founderImg from "../assets/founderImg.jpg";
import principalImg from "../assets/principalImg.jpg"; // सुनिश्चित करें path सही है

gsap.registerPlugin(ScrollTrigger);

export default function FoundersSection() {
  // refs
  const sectionRef = useRef(null);

  // First founder refs
  const firstImageRef = useRef(null);
  const firstAttrRef = useRef(null);
  const firstQuoteRef = useRef(null);

  // Divider refs (array of 3 lines)
  const dividerRefs = useRef([]);

  // Second founder refs
  const secondImageRef = useRef(null);
  const secondAttrRef = useRef(null);
  const secondQuoteRef = useRef(null);

  useLayoutEffect(() => {
    // Respect prefers-reduced-motion
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return; // do nothing if user prefers reduced motion

    // master timeline triggered when section comes into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none reverse",
        markers: false,
      },
      defaults: { ease: "power3.out" },
    });

    // Section subtle lift
    tl.from(sectionRef.current, { y: 18, opacity: 0, duration: 0.6 });

    // FIRST ROW: image pop + attribution slide + quote lines staggered
    tl.from(
      firstImageRef.current,
      {
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
        transformOrigin: "center center",
      },
      "-=0.35"
    );
    tl.from(
      firstAttrRef.current,
      { x: -24, opacity: 0, duration: 0.6 },
      "-=0.5"
    );
    // animate quote paragraphs inside firstQuoteRef (fade & y)
    tl.from(
      firstQuoteRef.current.querySelectorAll("p"),
      { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 },
      "-=0.55"
    );

    // draw dividers (three thin lines) with small stagger
    tl.from(
      dividerRefs.current,
      {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 0.45,
        stagger: 0.08,
      },
      "-=0.25"
    );

    // SECOND ROW: quote then image — animate quote first (aligned to layout)
    tl.from(
      secondQuoteRef.current.querySelectorAll("p"),
      { x: 18, opacity: 0, duration: 0.6, stagger: 0.08 },
      "-=0.15"
    );
    tl.from(
      secondAttrRef.current,
      { x: 24, opacity: 0, duration: 0.55 },
      "-=0.45"
    );
    tl.from(
      secondImageRef.current,
      {
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
        transformOrigin: "center center",
      },
      "-=0.55"
    );

    // small gentle loop for images (very subtle scale) on larger screens
    const subtleLoop = gsap.to(
      [firstImageRef.current, secondImageRef.current],
      {
        scale: 1.01,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: window.innerWidth < 1024,
      }
    );
    subtleLoop.play();

    // cleanup
    return () => {
      tl.kill();
      subtleLoop.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  // helper to set divider refs
  const setDividerRef = (el, idx) => {
    dividerRefs.current[idx] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-white"
      id="founders"
    >
      {/* Header */}
      <header className="text-center lg:text-left mb-6 sm:mb-10 lg:mb-16">
        <h1
          className="
            w-full block
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
            font-light tracking-wide sm:tracking-wider lg:tracking-widest
            leading-snug sm:leading-tight
          "
        >
          <span className="text-gray-300">FROM THE</span>{" "}
          <span className="text-[#c34147]">FOUNDERS</span>
        </h1>
      </header>

      {/* First Founder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8 gap-4 sm:gap-12 items-center">
        {/* Image column */}
        <div className="flex justify-center lg:justify-start items-center w-full h-full">
          <div
            ref={firstImageRef}
            className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-[#c83239] shadow-lg flex-shrink-0 overflow-hidden rounded-md"
          >
            <img
              src={founderImg}
              alt="Satish Kataria — Founder"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        </div>

        {/* Attribution + Quote */}
        <div className="flex flex-col lg:flex-row w-full h-full text-center lg:text-left space-y-2 lg:space-y-0 lg:space-x-10">
          {/* Attribution */}
          <div
            ref={firstAttrRef}
            className="flex flex-col justify-end w-full lg:w-auto whitespace-nowrap"
          >
            <img
              src={markImg}
              alt="signature mark"
              className="w-14 sm:w-16 mx-auto lg:mx-0 mb-2"
              loading="lazy"
            />
            <h3 className="font-gotham text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#c34147] font-medium mb-1 sm:mb-2">
              Satish Kataria
            </h3>
            <p className="font-myriad text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-light tracking-wide">
              Founder
            </p>
          </div>

          {/* Quote */}
          <blockquote
            ref={firstQuoteRef}
            className="font-myriad w-full lg:flex lg:items-center"
          >
            <div className="w-full text-center lg:text-right max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 sm:mb-1">
                "Every project is personal. For us,
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 sm:mb-1">
                and for the people who trust us.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 sm:mb-1">
                We don't just deliver spaces,
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0">
                we deliver the feeling of home."
              </p>
            </div>
          </blockquote>
        </div>
      </div>

      {/* Divider Lines */}
      <div className="mt-7 mb-10">
        <div className="space-y-1">
          <div
            ref={(el) => setDividerRef(el, 0)}
            className="h-px bg-[#C16367] w-full"
          />
          <div
            ref={(el) => setDividerRef(el, 1)}
            className="h-px bg-[#C16367] w-full"
          />
          <div
            ref={(el) => setDividerRef(el, 2)}
            className="h-px bg-[#C16367] w-full"
          />
        </div>
      </div>

      {/* Second Founder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 md:gap-0 items-stretch">
        {/* Left Column - Quote + Attribution */}
        <div className="flex flex-col w-full text-center lg:text-left order-2 lg:order-1">
          {/* Attribution */}
          <div
            ref={secondAttrRef}
            className="flex flex-col items-center lg:items-end w-full order-1 lg:order-2 mt-4 lg:mt-auto"
          >
            <img
              src={markImg}
              alt="signature mark"
              className="w-14 sm:w-16 mb-1"
              loading="lazy"
            />
            <h3 className="font-gotham text-xl sm:text-2xl md:text-3xl text-[#c34147] font-medium mb-1">
              Ar. Sanchi Vaswani
            </h3>
            <p className="font-myriad text-base font-light sm:text-lg md:text-xl text-gray-800 tracking-wide">
              Principal Architect
            </p>
          </div>

          {/* Quote */}
          <blockquote
            ref={secondQuoteRef}
            className="font-myriad w-full order-2 lg:order-1 mt-3 lg:mt-0 max-w-xl mx-auto lg:mx-0"
          >
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 sm:mb-1 whitespace-normal">
              "We do everything with care, because <br /> homes mean the world
              to people. Great design
            </p>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 sm:mb-1 whitespace-normal">
              comes from listening and that's what we do. <br /> Our goal is to
              make every idea real: efficiently,
            </p>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-0 whitespace-normal">
              beautifully, and sustainably."
            </p>
          </blockquote>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center lg:justify-end items-end order-1 lg:order-2 w-auto">
          <div
            ref={secondImageRef}
            className="h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 bg-[#c83239] shadow-lg flex-none overflow-hidden rounded-md"
          >
            <img
              src={principalImg}
              alt="Ar. Sanchi Vasvani — Principal Architect"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom Red Lines */}
      <div className="mt-6 sm:mt-12">
        <div className="space-y-1">
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
        </div>
      </div>
    </section>
  );
}
