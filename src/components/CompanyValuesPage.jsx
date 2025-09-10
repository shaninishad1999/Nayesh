import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CompanyValuesPage = () => {
  // root + section refs
  const rootRef = useRef(null);
  const redSectionRef = useRef(null);
  const valuesRefs = useRef([]); // three value columns
  const headerRef = useRef(null);
  const separatorsRef = useRef([]); // separator lines
  const howWeWorkRef = useRef(null);

  // process cards refs (Listen, Design, Deliver)
  const processRefs = useRef([]);

  // helpers to set in map
  const setValueRef = (el, idx) => {
    valuesRefs.current[idx] = el;
  };
  const setSeparatorRef = (el, idx) => {
    separatorsRef.current[idx] = el;
  };
  const setProcessRef = (el, idx) => {
    processRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    // respect reduced motion preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const triggerRoot = rootRef.current;
      if (!triggerRoot) return;

      // top red section entrance
      const redSt = {
        trigger: redSectionRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      };
      const tl = gsap.timeline({
        scrollTrigger: redSt,
        defaults: { ease: "power3.out" },
      });

      // container subtle entrance
      tl.from(redSectionRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        immediateRender: false,
      });

      // header pop
      if (headerRef.current) {
        tl.from(
          headerRef.current,
          {
            y: 8,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            immediateRender: false,
          },
          "-=0.45"
        );
      }

      // values columns stagger (center emphasis)
      const vals = (valuesRefs.current || []).filter(Boolean);
      if (vals.length) {
        // reveal center slightly earlier for balance
        const order = vals.length === 3 ? [vals[1], vals[0], vals[2]] : vals;
        tl.from(
          order,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            immediateRender: false,
          },
          "-=0.35"
        );
      }

      // small highlight on separators
      const seps = (separatorsRef.current || []).filter(Boolean);
      if (seps.length) {
        tl.from(
          seps,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.45,
            stagger: 0.08,
            immediateRender: false,
          },
          "-=0.45"
        );
      }

      // How we work header (big, right aligned) reveal
      if (howWeWorkRef.current) {
        tl.from(
          howWeWorkRef.current,
          { x: 28, opacity: 0, duration: 0.7, immediateRender: false },
          "-=0.35"
        );
      }

      // --- Process cards (Listen / Design / Deliver) ---
      const procSt = {
        trigger: triggerRoot,
        start: "top 80%",
        toggleActions: "play none none reverse",
      };
      const pTL = gsap.timeline({
        scrollTrigger: procSt,
        defaults: { ease: "power3.out" },
      });

      // reveal each process card with stagger and slight scale
      const procs = (processRefs.current || []).filter(Boolean);
      if (procs.length) {
        pTL.from(procs, {
          y: 22,
          opacity: 0,
          scale: 0.995,
          duration: 0.7,
          stagger: 0.14,
          immediateRender: false,
        });
      }

      // subtle breathing on process cards for large screens
      const breath = gsap.to(procs, {
        scale: 1.01,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: window.innerWidth < 1024,
        immediateRender: false,
      });

      // responsive control for breathing
      const onResize = () => {
        if (window.innerWidth < 1024) breath.pause();
        else breath.resume();
      };
      window.addEventListener("resize", onResize);

      // ensure ScrollTrigger refresh on load/resize to position correctly
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      // store small cleanup on root DOM node so outer cleanup can access if needed
      triggerRoot.__localCleanup = () => {
        try {
          tl.kill();
        } catch (e) {}
        try {
          pTL.kill();
        } catch (e) {}
        try {
          breath.kill();
        } catch (e) {}
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    }, rootRef);

    // outer cleanup
    return () => {
      const triggerRoot = rootRef.current;
      if (triggerRoot && triggerRoot.__localCleanup) {
        try {
          triggerRoot.__localCleanup();
        } catch (e) {}
        delete triggerRoot.__localCleanup;
      }
      try {
        ctx.revert();
      } catch (e) {}
      // kill any leftover ScrollTriggers related to this root
      ScrollTrigger.getAll().forEach((s) => {
        if (
          s.trigger &&
          rootRef.current &&
          s.trigger instanceof Element &&
          rootRef.current.contains(s.trigger)
        ) {
          try {
            s.kill();
          } catch (e) {}
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white " ref={rootRef}>
      {/* Values Section */}
      <div
        className="bg-[#C34147] text-white py-32  pb-60 px-8 relative"
        ref={redSectionRef}
      >
        <div className="max-w-6xl mx-auto">
          {/* Our Values Header */}
          <div className="text-left mb-12" ref={headerRef}>
            <h1 className="text-4xl md:text-7xl  font-light tracking-wider">
              OUR <span className="font-gotham">VALUES</span>
            </h1>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Promise-Driven Delivery */}
            <div
              className="text-left relative pb-6 md:pb-0"
              ref={(el) => setValueRef(el, 0)}
            >
              {/* Vertical line (desktop) */}
              <div className="hidden md:block absolute top-0 right-0 h-full border-r border-gray-300"></div>
              <div className="hidden md:block absolute top-0 right-1 h-full border-r border-gray-300"></div>

              {/* Horizontal line (mobile) */}
              <div className="block md:hidden absolute bottom-0 left-0 w-full border-b border-gray-300"></div>
              <div className="block md:hidden absolute bottom-1 left-0 w-full border-b border-gray-300"></div>


              <h2 className="md:text-4xl  lg:text-4xl text-xl font-light mb-12 tracking-wide">
                <span className="tracking-wider">PROMISE-DRIVEN</span>
                <br />
                <span className="font-gotham font-semibold">DELIVERY</span>
              </h2>
              <p className="text-base  opacity-90 pr-8 font-gotham font-medium  md:pr-4 tracking-wider ">
                Homes that embrace your <br /> everyday rituals, from morning{" "}
                <br /> light in the kitchen to quiet corners <br /> made for
                unwinding.
              </p>
            </div>

            {/* Human-First Design */}
            <div
              className="text-left relative pb-6 md:pb-0"
              ref={(el) => setValueRef(el, 1)}
            >
              {/* Vertical line (desktop) */}
              <div className="hidden md:block absolute top-0 right-0 h-full border-r border-gray-300"></div>
              <div className="hidden md:block absolute top-0 right-1 h-full border-r border-gray-300"></div>

              {/* Horizontal line (mobile) */}
              <div className="block md:hidden absolute bottom-0 left-0 w-full border-b border-gray-300"></div>
              <div className="block md:hidden absolute bottom-1 left-0 w-full border-b border-gray-300"></div>

              <h2 className="md:text-4xl  lg:text-4xl text-xl font-light mb-12 tracking-wide ">
                <span className="tracking-wider font-gothambold font-thin">HUMAN-FIRST</span>
                <br />
                <span className="font-gotham font-semibold">DESIGN</span>
              </h2>


              <p className="text-base  opacity-90 pr-8 font-gotham font-medium  md:pr-4 tracking-wider  ">
                Clear conversations, <br /> honest timelines, and a journey{" "}
                <br /> without hidden turns — so you <br />
                always know where you stand.
              </p>
            </div>

            {/* Quality That Lasts */}
            <div
              className="text-left relative"
              ref={(el) => setValueRef(el, 2)}
            >
              <h2 className="md:text-4xl  lg:text-4xl text-xl font-light mb-12 tracking-wide">
                <span className="font-gotham font-semibold">QUALITY</span>
                <br />
                <span className="tracking-wider">THAT LASTS</span>
              </h2>

              <p className="text-base  opacity-90 pr-8 font-gotham font-medium  md:pr-4 tracking-wider t">
                Craftsmanship that lingers <br /> in the little things: solid
                doors <br />
                that close softly, finishes that age <br /> with grace, and
                spaces built to <br /> hold generations of memories.
              </p>
            </div>
          </div>

          {/* Separator Lines */}
          <div
            className="border-t border-white border-opacity-30 mb-1"
            ref={(el) => setSeparatorRef(el, 0)}
          ></div>
          <div
            className="border-t border-white border-opacity-30 mb-1"
            ref={(el) => setSeparatorRef(el, 1)}
          ></div>
          <div
            className="border-t border-white border-opacity-30 mb-12"
            ref={(el) => setSeparatorRef(el, 2)}
          ></div>

          {/* How We Work Header */}
          <div className="text-right " ref={howWeWorkRef} id="offer">
            <h1 className="text-4xl md:text-7xl font-light tracking-wider ">
              HOW WE <span className="font-gotham">WORK</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Process Section - overlap half red half white */}
      <div className="relative -mt-56 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Listen */}
          <div
            className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]"
            ref={(el) => setProcessRef(el, 0)}
          >
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#c34147] mb-8 tracking-wider">
                LISTEN
              </h3>
              <div className="relative w-8 h-32 mx-auto mb-8">
                {/* Vertical line (height bada di) */}
                <div className="absolute left-1/2 top-0 h-full border-l-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Top horizontal line */}
                <div className="absolute top-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Bottom horizontal line */}
                <div className="absolute bottom-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>
              </div>

              <p className="text-gray-700 font-semibold leading-relaxed text-sm max-w-xs">
                We begin by hearing <br /> your story: the dreams, <br /> the
                must-haves, the budget <br /> boundaries, and the moments <br />{" "}
                you want your home to hold.
              </p>
            </div>
          </div>

          {/* Design */}
          <div
            className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]"
            ref={(el) => setProcessRef(el, 1)}
          >
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#c34147] mb-8 tracking-wider">
                DESIGN
              </h3>
              <div className="relative w-8 h-32 mx-auto mb-8">
                {/* Vertical line (height bada di) */}
                <div className="absolute left-1/2 top-0 h-full border-l-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Top horizontal line */}
                <div className="absolute top-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Bottom horizontal line */}
                <div className="absolute bottom-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>
              </div>

              <p className="text-gray-700 font-semibold leading-relaxed text-sm max-w-xs">
                Together, we sketch <br /> possibilities, explore materials,{" "}
                <br /> and shape a vision, <br /> each detail aligned to your{" "}
                <br /> life and aspirations.
              </p>
            </div>
          </div>

          {/* Deliver */}
          <div
            className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]"
            ref={(el) => setProcessRef(el, 2)}
          >
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#c34147] mb-8 tracking-wider">
                DELIVER
              </h3>
              <div className="relative w-8 h-32 mx-auto mb-8">
                {/* Vertical line (height bada di) */}
                <div className="absolute left-1/2 top-0 h-full border-l-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Top horizontal line */}
                <div className="absolute top-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>

                {/* Bottom horizontal line */}
                <div className="absolute bottom-0 left-1/2 w-8 border-t-2 border-[#c34147] transform -translate-x-1/2"></div>
              </div>

              <p className="text-gray-700 font-semibold leading-relaxed text-sm max-w-xs">
                From the first brick <br /> to the final key handover, <br /> we
                stand by you, guiding, <br /> supervising, and ensuring <br />{" "}
                your home welcomes <br /> you with ease and joy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so overlap doesn’t cut content */}
      <div className="h-32"></div>
    </div>
  );
};

export default CompanyValuesPage;
