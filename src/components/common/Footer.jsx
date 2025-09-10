import React, { useRef, useLayoutEffect } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";
import { BsWhatsapp } from "react-icons/bs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const colRefs = useRef([]); // for the 2 columns
  const copyrightRef = useRef(null);

  const setColRef = (el, idx) => {
    if (el) colRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    // respect reduced motion
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Timeline with scrollTrigger on the timeline (play once when it enters)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 85%",
        toggleActions: "play none none none", // play once, don't reverse on leave
        // once: true, // optionally you can use `once: true` too
      },
      defaults: { ease: "power3.out" },
    });

    // Use immediateRender: false to avoid GSAP setting starting styles immediately
    tl.from(rootRef.current, {
      y: 18,
      opacity: 0,
      duration: 0.6,
      immediateRender: false,
    });

    tl.from(
      logoRef.current,
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        transformOrigin: "center center",
        immediateRender: false,
      },
      "-=0.45"
    );

    tl.from(
      colRefs.current,
      { y: 18, opacity: 0, duration: 0.6, stagger: 0.12, immediateRender: false },
      "-=0.45"
    );

    tl.from(
      copyrightRef.current,
      { y: 12, opacity: 0, duration: 0.5, immediateRender: false },
      "-=0.35"
    );

    // Logo pulse: pause on small screens. Only play when not paused.
    const shouldPausePulse = window.innerWidth < 1024;
    const logoPulse = gsap.to(logoRef.current, {
      scale: 1.02,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: shouldPausePulse,
    });

    if (!shouldPausePulse) {
      logoPulse.play();
    }

    return () => {
      // cleanup
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      logoPulse.kill();
    };
  }, []);

  return (
    <footer ref={rootRef} className="bg-[#2E2E2E] text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Flex */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo & Socials */}
          <div className="flex flex-col items-start justify-between">
            <div>
              <div className="mb-8">
                <img
                  ref={logoRef}
                  src={logo}
                  alt="Nayash Logo"
                  className="w-56"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 hover:scale-110 transition-all duration-300 group">
                  <Instagram className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
                  <Facebook className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-300 group">
                  <Twitter className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 hover:scale-110 transition-all duration-300 group">
                  <BsWhatsapp className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Links (About + Other) */}
          <div className="grid grid-cols-2 md:flex md:space-x-16 text-left">
            {/* About */}
            <div ref={(el) => setColRef(el, 0)} className="font-gotham">
              <h3 className="text-2xl font-semibold mb-6 tracking-wider">
                ABOUT
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Brand Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Other */}
            <div ref={(el) => setColRef(el, 1)} className="font-gotham">
              <h3 className="text-2xl font-semibold mb-6 tracking-wider">
                OTHER
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Help
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline text-lg"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          ref={copyrightRef}
          className="mt-12 pt-8 border-t border-gray-600 text-center"
        >
          <p className="text-gray-400 text-sm font-gotham font-semibold">
            © 2025 NAYASH GROUP. All rights reserved. | WHERE SMILES BEGIN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
