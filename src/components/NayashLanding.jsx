import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/bgImg.jpg"; // apni image ka path yaha import karo

gsap.registerPlugin(ScrollTrigger);

export default function NayashLanding() {
  // Refs for whole section + key elements
  const sectionRef = useRef(null);
  const whereRef = useRef(null);
  const smilesRef = useRef(null);
  const beginRef = useRef(null);
  const rightColRef = useRef(null);
  const guideVerticalRef = useRef(null);
  const guideHorizontalRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const heroTextRef = useRef(null);

  useLayoutEffect(() => {
    // Respect prefers-reduced-motion
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Still attach a small non-motion-friendly reveal (no transforms) for accessibility
      gsap.set([sectionRef.current], { opacity: 1 });
      return;
    }

    const st = {
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none reverse",
    };

    const master = gsap.timeline({
      scrollTrigger: st,
      defaults: { ease: "power3.out" },
    });

    // Section subtle entrance
    master.from(sectionRef.current, { y: 20, opacity: 0, duration: 0.7 });

    // Headings: staggered scale + slide + opacity (left-to-right feel)
    master.from(
      [whereRef.current, smilesRef.current, beginRef.current],
      {
        x: -50,
        opacity: 0,
        scale: 0.98,
        duration: 0.65,
        stagger: 0.12,
        transformOrigin: "left center",
      },
      "-=0.3"
    );

    // Right column fades up
    master.from(
      rightColRef.current,
      { y: 24, opacity: 0, duration: 0.8 },
      "-=0.45"
    );

    // Guide lines draw (vertical then horizontal)
    master.fromTo(
      guideVerticalRef.current,
      { scaleY: 0, transformOrigin: "top center", opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.6 },
      "-=0.5"
    );

    master.fromTo(
      guideHorizontalRef.current,
      { scaleX: 0, transformOrigin: "left center", opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.45 },
      "-=0.55"
    );

    // Hero overlay subtle adjust & hero text entrance
    master.fromTo(
      heroOverlayRef.current,
      { opacity: 0.7 },
      { opacity: 0.5, duration: 0.9 },
      "-=0.4"
    );
    master.from(
      heroTextRef.current,
      { y: 20, opacity: 0, duration: 0.8 },
      "-=0.6"
    );

    // Parallax on hero background using ScrollTrigger (scrub)
    let bgST;
    if (heroBgRef.current) {
      bgST = gsap.to(heroBgRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    // Small breathing pulse for guides on larger screens
    const guidePulse = gsap.to(
      [guideVerticalRef.current, guideHorizontalRef.current],
      {
        scale: 1.02,
        transformOrigin: "center center",
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: window.innerWidth < 1024,
      }
    );
    guidePulse.play();

    // cleanup on unmount
    return () => {
      master.kill();
      if (bgST) bgST.kill();
      guidePulse.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className=" bg-gray-50 pt-8 relative">
      {/* Responsive Red Guide Lines - Rotated 180deg */}

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4  sm:px-6 sm:py-16 lg:px-8 lg:pb-0">
        {/* Top Section with Typography and Content */}
        <div className="grid lg:grid-cols-[auto,1fr] gap-4 lg:gap-28 mb-16 w-full">
          {/* Left Column - Large Typography */}
          <div className="text-center lg:text-left ">
            <span
              ref={whereRef}
              className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[107px] font-light text-[#c34147] leading-none tracking-wide mr-2"
            >
              WHERE
            </span>
            <span
              ref={smilesRef}
              className="inline text-2xl  sm:text-4xl lg:block lg:text-5xl xl:text-[107px] font-light text-[#c34147] leading-none tracking-wide mr-2"
            >
              SMILES
            </span>
            <span
              ref={beginRef}
              className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[107px] font-light text-[#c34147] leading-none tracking-wide"
            >
              BEGIN
            </span>
          </div>

          {/* Right Column - Description Text */}
          <div ref={rightColRef} className="space-y-8 min-w-0 w-full">
            <div className="space-y-0 text-gray-700 pl-4 md:pl-0 lg:pl-0 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-left w-full">
              <p className="mb-1 tracking-wider ">
                <span className="text-[#c34147] font-gotham font-semibold">
                  Nayash
                </span>{" "}
                is more than a name.
              </p>
              <p className="mb-1">
                It’s the spirit of fresh starts and possibilities.
              </p>
              <p className="mb-1">
                It is an{" "}
                <span className="text-[#c34147] font-semibold">
                  architecture and interiors studio
                </span>
                , shaping
              </p>
              <p>premium homes and communities in Pune, and</p>
              <p className="mb-1">
                a{" "}
                <span className="text-[#c34147] font-semibold">
                  construction house
                </span>{" "}
                defining residential
              </p>
              <p className="mb-1">
                spaces within the city. It carries ideas that grow, adapt,
              </p>
              <p>and turn into something lasting.</p>
              <p className="mb-1">
                We hear you, and design around your needs with care,
              </p>
              <p> efficiency, and honest delivery.</p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[9999] flex items-start justify-center rotate-180">
          <div
            className="
    relative
    mt-[40vh]                /* default (mobile / normal) */
    sm:mt-[50vh]             /* small screens (≥64px) */
    md:mt-[50vh]             /* medium screens (≥768px) */
    lg:mt-[45vh]             /* large screens (≥1024px) */
     xl:mt-[50vh]           /* ≥1280px */
    2xl:mt-[40vh]          /* ≥1536px */
    translate-x-4            /* default */
    sm:translate-x-6         /* small screens */
    md:translate-x-8         /* medium screens */
    lg:translate-x-10        /* large screens */
  "
          >
            {/* Vertical line */}
            <div
              ref={guideVerticalRef}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-[2.5px] bg-red-500 mx-auto"
              style={{ transformOrigin: "top center" }}
            />
            {/* Horizontal line (centered on vertical) */}
            <div
              ref={guideHorizontalRef}
              className="h-[2.5px] w-6 sm:w-8 md:w-10 lg:w-12 bg-red-500 absolute left-1/2 -translate-x-1/2 -top-[1.25px]"
              style={{ transformOrigin: "left center" }}
            />
          </div>
        </div>
        {/* Hero Image Section */}
       

<div className="relative w-full max-w-full mx-auto">
  {/* Hero: use aspect ratio so height scales with width */}
  <div className="relative w-full overflow-hidden shadow-2xl aspect-[3/1] md:aspect-[4/1]">
    {/* Background Image - fill container */}
    <img
      src={bgImage}
      alt=""
      className="block w-full h-full object-cover object-center"
    />

    {/* Centered Text Overlay */}
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <h2
        ref={heroTextRef}
        className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-gotham font-bold text-center leading-relaxed max-w-4xl"
      >
        All we want is simple: to see you smiling.
      </h2>
    </div>

   
  </div>

  {/* Red bar below hero — keep as before but remove extreme negative margins */}
  <div className="bg-[#c34147] h-20 md:h-28 lg:h-36 w-full"></div>
</div>

      </div>

      <div className="bg-[#c34147] h-28 lg:h-44 w-full -mt-12"></div>
    </div>
  );
}
