import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NayashGroupCard = () => {
  // refs (only structural: do not change your JSX text/content)
  const root = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const sideTitleRef = useRef(null);
  const headerTextRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    // respect reduced motion settings
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const st = {
        trigger: root.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      };

      const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      // container subtle entrance
      tl.from(root.current, { y: 18, opacity: 0, duration: 0.6 });

      // header text (above card) slight pop
      tl.from(
        headerTextRef.current,
        { y: 8, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      );

      // panel stagger: center first then left/right for a balanced reveal
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

      // side vertical title reveal on desktop (slide & fade)
      tl.from(
        sideTitleRef.current,
        { opacity: 0, x: 18, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // subtle breathing for the colored panels (very gentle)
      const breathe = gsap.to([leftRef.current, centerRef.current, rightRef.current], {
        scale: 1.01,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: window.innerWidth < 1024, // pause on small screens
      });

      // ensure breath restarts on resize if needed
      const onResize = () => {
        if (window.innerWidth < 1024) {
          breathe.pause();
        } else {
          breathe.play();
        }
      };
      window.addEventListener("resize", onResize);

      // cleanup binding
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
    <div className="max-w-6xl mx-auto p-6 min-h-screen" ref={root}>
      {/* Header Text */}
      <div className="mb-8" ref={headerTextRef}>
        <p className="text-gray-700 text-2xl md:text-2xl leading-relaxed max-w-4xl font-gotham font-semibold">
          As{" "}
          <span className="text-[#c34147] font-semibold font-gotham">
            Nayash Group
          </span>
          , everything we do is shaped by one belief: <br /> It's not just about
          building walls or sketching plans — it's about <br /> creating places
          that carry comfort, joy, and belonging.
        </p>
      </div>

      {/* Main Card Layout */}
      <div className="relative bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[26rem]">
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

          {/* Left Section - Upscale Housing (Bottom) */}
          <div
            className="w-full md:w-1/3 bg-[#C24040] text-white p-8  flex flex-col justify-end"
            ref={leftRef}
          >
            <h3 className="text-xl md:text-2xl   tracking-wide font-gotham">
              UPSCALE
              <br />
              HOUSING:
            </h3>
            <p className="text-white-200 text-base md:text-3xl font-thin tracking-wider">
              STRONG IN ITS
              <br />
              FOUNDATION.
            </p>
          </div>

          {/* Center Section - Architectural Solutions (Top) */}
          <div
            className="w-full md:w-1/3 bg-[#cb626b] text-white p-6 flex flex-col justify-start"
            ref={centerRef}
          >
            <h3 className="text-xl md:text-2xl font-bold  tracking-wide font-gotham">
              ARCHITECTURAL
              <br />
              SOLUTIONS:
            </h3>
            <p className="text-white-200 text-base md:text-3xl font-light tracking-wider ">
              BOLD IN
              <br />
              THOUGHT.
            </p>
          </div>

          {/* Right Section - Interior Designing (Bottom) */}
          <div
            className="w-full md:w-1/3 bg-[#f7a7b2] text-white p-6 flex flex-col justify-end"
            ref={rightRef}
          >
            <h3 className="text-xl md:text-2xl font-bold tracking-wide font-gotham">
              INTERIOR
              <br />
              DESIGNING:
            </h3>
            <p className="text-white-200 text-base md:text-3xl font-light tracking-wider">
              TRUSTED IN
              <br />
              EXECUTION.
            </p>
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
        <div className="p-6 md:p-10 text-center md:text-right bg-white md:mr-[95px]">
          <p className="text-gray-600 mb-3 text-base md:text-lg font-gotham">
            That's where our identity finds its heart.
          </p>
          <p className="text-gray-700 text-lg md:text-xl font-gotham">
            Because in the end, a home is about stories,
            <span className="text-[#c34147] font-semibold">
              {" "}
              filled with trust,  <br className="hidden md:block" />{" "}
            happiness,  and belonging.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NayashGroupCard;
