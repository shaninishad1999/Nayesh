import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1ethos1 from "../assets/ethos1.jpg";
import img1ethos2 from "../assets/ethos2.jpg";
import img1ethos3 from "../assets/ethos3.jpg";

gsap.registerPlugin(ScrollTrigger);

const NayashGroupCard = () => {
  const root = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const sideTitleRef = useRef(null);
  const headerTextRef = useRef(null);
  const tlRef = useRef(null);

  const [leftFlipped, setLeftFlipped] = useState(false);
  const [centerFlipped, setCenterFlipped] = useState(false);
  const [rightFlipped, setRightFlipped] = useState(false);

  useLayoutEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const st = {
        trigger: root.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      };

      const tl = gsap.timeline({
        scrollTrigger: st,
        defaults: { ease: "power3.out" },
      });
      tlRef.current = tl;

      tl.from(root.current, { y: 18, opacity: 0, duration: 0.6 });

      tl.from(
        headerTextRef.current,
        { y: 8, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      );

      tl.from(
        [centerRef.current, leftRef.current, rightRef.current],
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.35"
      );

      tl.from(
        sideTitleRef.current,
        { opacity: 0, x: 18, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      const breathe = gsap.to(
        [leftRef.current, centerRef.current, rightRef.current],
        {
          scale: 1.01,
          duration: 3.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          paused: window.innerWidth < 1024,
        }
      );

      const onResize = () => {
        if (window.innerWidth < 1024) {
          breathe.pause();
        } else {
          breathe.play();
        }
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, root);

    return () => {
      if (tlRef.current) tlRef.current.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 " ref={root} id="ethos">
      {/* Header Text */}
      <div className="mb-8" ref={headerTextRef}>
        <p
          className=" px-8 pl-0
      text-gray-700 
      text-sm sm:text-base md:text-lg lg:text-xl 
      leading-6 sm:leading-7 md:leading-relaxed 
      max-w-4xl w-full 
      font-gotham 
      mx-4 sm:mx-0
      whitespace-normal break-words
    "
        >
          As <span className="text-[#c34147] font-semibold">Nayash Group</span>,
          everything we do is shaped by one belief:
          <span className="hidden md:inline">
            <br />
          </span>{" "}
          It's not just about building walls or sketching plans — it's about
          <span className="hidden md:inline">
            <br />
          </span>{" "}
          creating places that carry comfort, joy, and belonging.
        </p>
      </div>

      {/* Main Card Layout */}
      <div className="relative bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[26rem] gap-6 md:gap-0">
          {/* OUR ETHOS - Mobile (top) */}
          <div className="block md:hidden mb-6">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl tracking-widest text-center whitespace-nowrap font-gotham">
                <span className="text-gray-400">OUR</span>{" "}
                <span className="text-[#c34147]">ETHOS</span>
              </h1>
              <div className="w-full max-w-sm h-1.5 bg-[#c34147] mt-3"></div>
            </div>
          </div>

          {/* Left Section (mobile: left-center) */}
          <div
            className="w-full md:w-1/3 relative h-64 sm:h-72 md:h-auto [perspective:1000px] cursor-pointer"
            onClick={() => setLeftFlipped((v) => !v)}
            onMouseEnter={() => setLeftFlipped(true)}
            onMouseLeave={() => setLeftFlipped(false)}
            ref={leftRef}
          >
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${
                leftFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-[#C24040] text-white p-6 flex flex-col items-start justify-center md:justify-end [backface-visibility:hidden] rounded-lg">
                <h3 className="text-xl md:text-2xl tracking-wide font-gotham">
                  UPSCALE
                  <br />
                  HOUSING:
                </h3>
                <p className="text-base md:text-3xl font-thin tracking-wider">
                  STRONG IN ITS
                  <br />
                  FOUNDATION.
                </p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-lg">
                <img
                  src={img1ethos1}
                  alt="Upscale Housing"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center p-6">
                  {/* mobile: left-aligned center-vert, desktop: bottom */}
                  <div className="w-full md:w-auto text-white flex flex-col items-start md:items-start">
                    <h3 className="text-xl md:text-2xl tracking-wide font-gotham">
                      UPSCALE
                      <br />
                      HOUSING:
                    </h3>
                    <p className="text-base md:text-3xl font-thin tracking-wider">
                      STRONG IN ITS
                      <br />
                      FOUNDATION.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section (mobile: right-center) */}
          <div
            className="w-full md:w-1/3 relative h-64 sm:h-72 md:h-auto [perspective:1000px] cursor-pointer"
            onClick={() => setCenterFlipped((v) => !v)}
            onMouseEnter={() => setCenterFlipped(true)}
            onMouseLeave={() => setCenterFlipped(false)}
            ref={centerRef}
          >
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${
                centerFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-[#cb626b] text-white p-6 flex flex-col items-end justify-center md:items-center md:justify-start [backface-visibility:hidden] rounded-lg">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide font-gotham text-right md:text-left">
                  ARCHITECTURAL
                  <br />
                  SOLUTIONS:
                </h3>
                <p className="text-base md:text-3xl font-light tracking-wider text-right md:text-left">
                  BOLD IN
                  <br />
                  THOUGHT.
                </p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-lg">
                <img
                  src={img1ethos2}
                  alt="Architectural Solutions"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center p-6">
                  {/* mobile: right-aligned center-vert, desktop: center */}
                  <div className="w-full flex flex-col items-end justify-center text-white text-right md:items-center md:text-center">
                    <h3 className="text-xl md:text-2xl font-bold tracking-wide font-gotham">
                      ARCHITECTURAL
                      <br />
                      SOLUTIONS:
                    </h3>
                    <p className="text-base md:text-3xl font-light tracking-wider">
                      BOLD IN
                      <br />
                      THOUGHT.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (mobile: left-center) */}
          <div
            className="w-full md:w-1/3 relative h-64 sm:h-72 md:h-auto [perspective:1000px] cursor-pointer"
            onClick={() => setRightFlipped((v) => !v)}
            onMouseEnter={() => setRightFlipped(true)}
            onMouseLeave={() => setRightFlipped(false)}
            ref={rightRef}
          >
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${
                rightFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-[#f7a7b2] text-white p-6 flex flex-col items-start justify-center md:items-end md:justify-end [backface-visibility:hidden] rounded-lg">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide font-gotham text-left md:text-right">
                  INTERIOR
                  <br />
                  DESIGNING:
                </h3>
                <p className="text-base md:text-3xl font-light tracking-wider text-left md:text-right">
                  TRUSTED IN
                  <br />
                  EXECUTION.
                </p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-lg">
                <img
                  src={img1ethos3}
                  alt="Interior Designing"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center p-6">
                  {/* mobile: left-aligned center-vert, desktop: bottom/right */}
                  <div className="w-full md:w-auto text-white flex flex-col items-start md:items-end">
                    <h3 className="text-xl md:text-2xl font-bold tracking-wide font-gotham text-left">
                      INTERIOR
                      <br />
                      DESIGNING:
                    </h3>
                    <p className="text-base md:text-3xl font-light tracking-wider text-left">
                      TRUSTED IN
                      <br />
                      EXECUTION.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OUR ETHOS - Desktop (side) */}
          <div className="hidden md:flex justify-center">
            <h1
              className="text-7xl px-5 tracking-widest [writing-mode:vertical-rl] rotate-180 font-gotham"
              ref={sideTitleRef}
            >
              <span className="text-gray-400">OUR</span>{" "}
              <span className="text-[#c34147]">ETHOS</span>
            </h1>
            <div className="w-2 bg-[#c34147] mr-5"></div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="pl-0 pr-6 pt-6 pb-6 md:p-10 text-left md:text-right bg-white md:mr-[95px]">
          <p className="text-gray-600 mb-3 text-base md:text-lg font-gotham">
            That's where our identity finds its heart.
          </p>
          <p className="text-gray-700 text-lg md:text-xl font-gotham">
            Because in the end, a home is about stories,
            <span className="text-[#c34147] font-semibold">
              {" "}
              filled with trust, <br className="hidden md:block" /> happiness,
              and belonging.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NayashGroupCard;
