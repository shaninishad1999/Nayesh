import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/crousalImg/1.jpg"; // apni image ka path yaha import karo

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
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Still attach a small non-motion-friendly reveal (no transforms) for accessibility
      gsap.set([sectionRef.current], { opacity: 1 });
      return;
    }

    const st = {
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none reverse",
    };

    const master = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });

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
    master.from(rightColRef.current, { y: 24, opacity: 0, duration: 0.8 }, "-=0.45");

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
    master.fromTo(heroOverlayRef.current, { opacity: 0.7 }, { opacity: 0.5, duration: 0.9 }, "-=0.4");
    master.from(heroTextRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

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
    const guidePulse = gsap.to([guideVerticalRef.current, guideHorizontalRef.current], {
      scale: 1.02,
      transformOrigin: "center center",
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: window.innerWidth < 1024,
    });
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
    <div ref={sectionRef} className="min-h-screen bg-gray-50 pt-8 relative">
      {/* Responsive Red Guide Lines - Rotated 180deg */}
      <div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center rotate-180">
        <div className="relative mt-[34vh] sm:mt-[32vh] lg:mt-[36vh] translate-x-6 sm:translate-x-8 lg:translate-x-10">
          {/* Vertical line */}
          <div
            ref={guideVerticalRef}
            className="h-14 sm:h-20 lg:h-24 w-px bg-red-500 mx-auto"
            style={{ transformOrigin: "top center" }}
          />
          {/* Horizontal line (centered on vertical) */}
          <div
            ref={guideHorizontalRef}
            className="h-px w-8 sm:w-10 lg:w-12 bg-red-500 absolute left-1/2 -translate-x-1/2 -top-[1px]"
            style={{ transformOrigin: "left center" }}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 pb-0 lg:px-8 lg:pb-0 py-12">
        {/* Top Section with Typography and Content */}
        <div className="grid lg:grid-cols-[auto,1fr] gap-16 lg:gap-36 mb-16 w-full">
          {/* Left Column - Large Typography */}
          <div className="text-center lg:text-left ">
            <span
              ref={whereRef}
              className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide mr-2"
            >
              WHERE
            </span>
            <span
              ref={smilesRef}
              className="inline text-2xl  sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide mr-2"
            >
              SMILES
            </span>
            <span
              ref={beginRef}
              className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide"
            >
              BEGIN
            </span>
          </div>

          {/* Right Column - Description Text */}
          <div ref={rightColRef} className="space-y-8 min-w-0 w-full font-gotham ">
            <div className="space-y-0 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center sm:text-left w-full">
              <p className="mb-1">
                <span className="text-[#c34147] font-gotham  font-semibold">Nayash</span> is more than a
                name.
              </p>
              <p className="mb-1 ">It’s the spirit of fresh starts and possibilities.</p>
              <p className="mb-1">
                It is an <span className="text-[#c34147] font-semibold">architecture and interiors studio</span>, shaping
              </p>
              <p>premium homes and communities in Pune, and</p>
              <p className="mb-1">
                a <span className="text-[#c34147] font-semibold">construction house</span> defining residential
              </p>
              <p className="mb-1">spaces within the city. It carries ideas that grow, adapt,</p>
              <p>and turn into something lasting.</p>
              <p className="mb-1">We hear you, and design around your needs with care,</p>
              <p> efficiency, and honest delivery.</p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-48 overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div
            ref={heroBgRef}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div ref={heroOverlayRef} className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2
              ref={heroTextRef}
              className="text-white text-2xl lg:text-3xl xl:text-4xl font-gotham  font-bold text-center px-6 leading-relaxed "
            >
              All we want is simple: to see you smiling.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-[#c34147] h-28 lg:h-36 w-full -mt-12"></div>
    </div>
  );
}
