// Footer.jsx
import React, { useRef, useLayoutEffect, useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";
import { BsWhatsapp } from "react-icons/bs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import PrivacyModal from "./PrivacyModal"; // existing
import TermsModal from "./TermsModal"; // NEW: ensure path is correct

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const colRefs = useRef([]);
  const copyrightRef = useRef(null);

  const navigate = useNavigate();

  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isTermsOpen, setTermsOpen] = useState(false);

  const setColRef = (el, idx) => {
    if (el) colRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

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
      {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        immediateRender: false,
      },
      "-=0.45"
    );

    tl.from(
      copyrightRef.current,
      { y: 12, opacity: 0, duration: 0.5, immediateRender: false },
      "-=0.35"
    );

    const shouldPausePulse = window.innerWidth < 1024;
    const logoPulse = gsap.to(logoRef.current, {
      scale: 1.02,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: shouldPausePulse,
    });

    if (!shouldPausePulse) logoPulse.play();

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      logoPulse.kill();
    };
  }, []);

  // scrollToId logic - mirrors Header behavior
  const scrollToId = (id) => {
    // try to find element on current page
    const el = document.getElementById(id);
    if (!el) {
      // if not present on current page, navigate to home (where sections live)
      // then attempt to scroll after navigation using a tiny timeout
      navigate("/");
      // small delay to allow route render — conservative but simple
      setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const header = document.querySelector("header");
        const headerOffset = header ? header.offsetHeight : 80;
        const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
        const scrollToPosition = Math.max(elementTop - headerOffset - 8, 0);
        window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }, 120); // 120ms — works in most render cases
      return;
    }

    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight : 80;
    const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
    const scrollToPosition = Math.max(elementTop - headerOffset - 8, 0);
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
  };

  const openPrivacy = (e) => {
    e && e.preventDefault();
    setPrivacyOpen(true);
  };
  const closePrivacy = () => setPrivacyOpen(false);

  const openTerms = (e) => {
    e && e.preventDefault();
    setTermsOpen(true);
  };
  const closeTerms = () => setTermsOpen(false);

  return (
    <>
      <footer
        ref={rootRef}
        className="bg-[#2E2E2E] text-white lg:py-8 md:py-6 py-6 pt-0 sm:pt-0 px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Flex */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Logo & Socials */}
            <div className="flex flex-col md:justify-between">
              <div className="mt-8 md:mt-auto">
                <img
                  ref={logoRef}
                  src={logo}
                  alt="Nayash Logo"
                  className="w-56"
                />
              </div>
              <div className="mb-8 mt-10 md:mb-0">
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

            {/* Links (About + Other) - Fixed mobile layout */}
            <div className="grid grid-cols-2 md:flex md:space-x-16 gap-x-8 gap-y-6 text-left">
              {/* About */}
              <div
                ref={(el) => setColRef(el, 0)}
                className="font-gotham"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-wider">
                  ABOUT
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToId("founders")}
                      className="text-gray-100 hover:underline text-sm md:text-lg text-left"
                    >
                      Our Team
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToId("ethos")}
                      className="text-white hover:text-white hover:underline text-sm md:text-lg text-left"
                    >
                      Brand Guidelines
                    </button>
                  </li>
                  <li>
                    {/* TERMS opens modal now */}
                    <button
                      onClick={openTerms}
                      className="text-white hover:text-white hover:underline text-sm md:text-lg text-left"
                    >
                      Terms &amp; Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openPrivacy}
                      className="text-white hover:text-white hover:underline text-sm md:text-lg text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>

              {/* Other */}
              <div
                ref={(el) => setColRef(el, 1)}
                className="font-gotham "
              >
                <h3 className="text-xl text-white md:text-2xl font-semibold mb-4 md:mb-6 tracking-wider">
                  OTHER
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToId("contact")}
                      className="text-white hover:text-white hover:underline text-sm md:text-lg text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToId("offer")}
                      className="text-white hover:text-white hover:underline text-sm md:text-lg text-left"
                    >
                      Help
                    </button>
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright - Fixed color visibility */}
          <div
            ref={copyrightRef}
            className="mt-8 pt-8 border-t border-gray-300 text-center relative "
          >
            <p className="text-red-600 text-sm font-gotham font-semibold">
              © 2025 NAYASH GROUP. All rights reserved.
            </p>

            {/* Designed by credit */}
            <p className="mt-3 text-yellow-200 text-xs font-gotham">
              Designed by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Hously Finntech
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={closePrivacy} />
      <TermsModal isOpen={isTermsOpen} onClose={closeTerms} />
    </>
  );
};

export default Footer;
