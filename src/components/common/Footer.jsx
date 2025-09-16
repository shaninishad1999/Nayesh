// Footer.jsx
import React, { useRef, useLayoutEffect, useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";
import { BsWhatsapp } from "react-icons/bs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
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

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const header = document.querySelector("header");
        const headerOffset = header ? header.offsetHeight : 80;
        const elementTop =
          target.getBoundingClientRect().top + window.pageYOffset;
        const scrollToPosition = Math.max(elementTop - headerOffset - 8, 0);
        window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }, 120);
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
          {/* Grid:
              mobile: 1 col stack
              md: 2 cols -> row1: logo | address ; row2: about + other (spans both cols)
              lg: 3 cols single row -> logo | address | links (about+other)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Logo & Socials */}
            <div className="flex flex-col">
              <div className="mt-8 md:mt-auto">
                <img
                  ref={logoRef}
                  src={logo}
                  alt="Nayash Logo"
                  className="w-56 md:w-52 lg:w-56"
                />
              </div>
              <div className="mb-6 mt-6 md:mb-0">
                <div className="flex space-x-4">
                  {/* use buttons for better accessibility */}
                  <button
                    aria-label="Instagram"
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <Instagram className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                  </button>
                  <button
                    aria-label="Facebook"
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
                  >
                    <Facebook className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                  </button>
                  <button
                    aria-label="Twitter"
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-300 group"
                  >
                    <Twitter className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                  </button>
                  <button
                    aria-label="WhatsApp"
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <BsWhatsapp className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="font-gotham">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 tracking-wider text-white">
                ADDRESS
              </h3>

              <ul className="space-y-1 text-sm md:text-lg tracking-wider text-gray-200">
                <li>
                  <address className="not-italic ">
                   First Floor,Tamara Uprise,
                    <br />
                    Pune, 411017
                  </address>
                </li>
                <li className="mt-1">
                  <IoCallOutline className="inline-block text-red-500" />:{" "}
                  <a
                    href="tel:+919762444444"
                    className="hover:underline hover:decoration-red-400 hover:text-white underline-offset-2"
                  >
                    +91 97624 44444
                  </a>
                </li>
                <li>
                  <MdOutlineEmail className="inline-block text-red-500" />:{" "}
                  <a
                    href="mailto:nayashdesignstudio@gmail.com"
                    className="hover:underline hover:decoration-red-400 hover:text-white underline-offset-2"
                  >
                    nayashdesignstudio@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* About + Other:
                - keep grid on small/medium
                - switch to flex on lg; OTHER will have lg:ml-auto to push it to far right
                - inside OTHER text remains left-aligned
            */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-2 lg:col-span-1 items-start lg:flex lg:items-start lg:justify-between">
              {/* About */}
              <div
                ref={(el) => setColRef(el, 0)}
                className="font-gotham text-left"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-wider ">
                  ABOUT US
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToId("founders")}
                      className="text-gray-100 hover:underline text-sm md:text-lg text-left  hover:decoration-red-400 hover:text-white underline-offset-2"
                    >
                      Our Team
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToId("ethos")}
                      className="text-white  hover:underline hover:decoration-red-400 hover:text-white underline-offset-2 text-sm md:text-lg text-left"
                    >
                      Brand Guidelines
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openTerms}
                      className="text-white hover:underline hover:decoration-red-400 hover:text-white underline-offset-2 text-sm md:text-lg text-left"
                    >
                      Terms &amp; Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openPrivacy}
                      className="text-white hover:underline hover:decoration-red-400 hover:text-white underline-offset-2 text-sm md:text-lg text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>

              {/* Other: pushed to far right but no extra gap */}
              <div
                ref={(el) => setColRef(el, 1)}
                className="font-gotham text-left"
              >
                <h3 className="text-xl text-white md:text-2xl font-semibold mb-4 md:mb-6 tracking-wider">
                  OTHER
                </h3>
                <ul className="space-y-2 md:space-y-3 text-left">
                  <li>
                    <button
                      onClick={() => scrollToId("contact")}
                      className="text-white hover:underline hover:decoration-red-400 hover:text-white underline-offset-2 text-sm md:text-lg"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToId("offer")}
                      className="text-white hover:underline hover:decoration-red-400 hover:text-white underline-offset-2 text-sm md:text-lg"
                    >
                      Help
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            ref={copyrightRef}
            className="mt-8 pt-8 border-t border-white text-center relative "
          >
            <p className="text-red-600 text-sm font-gotham font-semibold">
              © 2025 NAYASH GROUP. All rights reserved.
            </p>

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

      <PrivacyModal isOpen={isPrivacyOpen} onClose={closePrivacy} />
      <TermsModal isOpen={isTermsOpen} onClose={closeTerms} />
    </>
  );
};

export default Footer;
