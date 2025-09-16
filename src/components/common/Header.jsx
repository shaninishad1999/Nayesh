
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/menuIcon.png";
import colorLogo from "../../assets/colorLogo.png";
import ImageCarousel from "./ImageCarousel";

/* =========================
   IntroSplash Component (SLOWER timings)
   ========================= */

const IntroSplash = ({ onFinish }) => {
  const splashContainerRef = useRef(null); // container for logo + dots
  const overlayRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const splashContainer = splashContainerRef.current;
    const overlayEl = overlayRef.current;
    const dotsEl = dotsRef.current;

    // initial entrance
    splashContainer.style.transform = "translate(-50%, -50%) scale(0.95)";
    splashContainer.style.opacity = "0";
    requestAnimationFrame(() => {
      splashContainer.style.transition =
        "transform 900ms cubic-bezier(.2,.9,.3,1), opacity 700ms ease";
      splashContainer.style.transform = "translate(-50%, -50%) scale(1.02)";
      splashContainer.style.opacity = "1";
    });

    const totalDelay = 1800;
    const moveDuration = 1200;

    const timeout1 = setTimeout(() => {
      if (!mounted) return;
      const headerLogo = document.querySelector("img[data-header-logo]");
      if (!headerLogo) {
        splashContainer.style.transition = `opacity 700ms ease, transform 700ms ease`;
        splashContainer.style.opacity = "0";
        setTimeout(() => onFinish?.(), 780);
        return;
      }

      const splashRect = splashContainer.getBoundingClientRect();
      const targetRect = headerLogo.getBoundingClientRect();

      const splashCenterX = splashRect.left + splashRect.width / 2;
      const splashCenterY = splashRect.top + splashRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const translateX = targetCenterX - splashCenterX;
      const translateY = targetCenterY - splashCenterY;

      let scale = targetRect.width / splashRect.width;
      scale = Math.max(0.45, Math.min(scale, 1.2));

      splashContainer.style.transition = `transform ${moveDuration}ms cubic-bezier(.2,.9,.3,1), opacity ${moveDuration}ms ease`;
      splashContainer.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`;

      overlayEl.style.transition = `opacity ${moveDuration}ms ease`;
      overlayEl.style.opacity = "0";

      const afterMoveTimeout = setTimeout(() => {
        if (!mounted) return;
        if (dotsEl) {
          dotsEl.style.transition = "opacity 260ms ease, transform 260ms ease";
          dotsEl.style.opacity = "0";
          dotsEl.style.transform = "translateY(-6px)";
        }

        const fadeLogoTimeout = setTimeout(() => {
          if (!mounted) return;
          splashContainer.style.transition = `opacity 500ms ease, transform 500ms ease`;
          splashContainer.style.opacity = "0";

          const finishTimeout = setTimeout(() => {
            onFinish?.();
          }, 520);
          return () => clearTimeout(finishTimeout);
        }, 300);

        return () => clearTimeout(fadeLogoTimeout);
      }, moveDuration + 30);

      return () => clearTimeout(afterMoveTimeout);
    }, totalDelay);

    return () => {
      mounted = false;
      clearTimeout(timeout1);
    };
  }, [onFinish]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#C24040",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 600ms ease",
      }}
    >
      <div
        ref={splashContainerRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          width: "min(420px, 80vw)",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          willChange: "transform, opacity",
        }}
      >
        <img
          src={logo}
          alt="Site logo"
          style={{
            width: "100%",
            maxWidth: "420px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
            borderRadius: "8px",
            display: "block",
          }}
        />

        <div
          ref={dotsRef}
          style={{
            marginTop: "14px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.85,
            transition: "opacity 260ms ease, transform 260ms ease",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#E25A5A",
              transformOrigin: "center",
              animation: "pulseDot 1.6s infinite ease-in-out",
              animationDelay: "0s",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#cb626b",
              transformOrigin: "center",
              animation: "pulseDot 1.6s infinite ease-in-out",
              animationDelay: "0.25s",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#f7a7b2",
              transformOrigin: "center",
              animation: "pulseDot 1.6s infinite ease-in-out",
              animationDelay: "0.5s",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.35); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
};

/* =========================
   Header Component
   ========================= */

const Header = () => {
  const navigate = useNavigate();
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsDesktopMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
    } else {
      e.preventDefault();
      navigate("/");
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "founders", path: "/founders", label: "FROM THE FOUNDERS" },
    { id: "ethos", path: "/ethos", label: "OUR ETHOS" },
    { id: "offer", path: "/offer", label: "WHAT WE OFFER" },
    { id: "contact", path: "/contact", label: "CONTACT US" },
  ];

  const textColorClass = isScrolled ? "text-red-600" : "text-white";
  const hoverColorClass = isScrolled
    ? "hover:text-red-700"
    : "hover:text-blue-400";
  const mobileTextColor = isScrolled ? "text-red-600" : "text-white";

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
      return;
    }
    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight : 80;
    const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
    const scrollToPosition = Math.max(elementTop - headerOffset - 8, 0);
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    setIsDesktopMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const showColorLogo = isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4  sm:px-14">
        <div className="ml-2 sm:ml-4">
          <Link to="/" aria-label="Go to home" onClick={handleLogoClick}>
            <img
              src={showColorLogo ? colorLogo : logo}
              data-header-logo="true"
              alt="MyLogo"
              className={`w-auto transition-all duration-500 ease-out ${
                isScrolled
                  ? "h-12 sm:h-14 md:h-16 lg:h-20"
                  : "h-14 sm:h-16 md:h-20 lg:h-24"
              }`}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <nav className="hidden lg:flex gap-8 mr-8 items-center">
          {menuItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`${textColorClass} font-gotham font-light ${hoverColorClass} transition-colors duration-300 text-sm xl:text-base`}
              aria-label={`Go to ${item.label}`}
            >
              {item.label}
            </button>
          ))}

          <div className="relative flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => scrollToId("contact")}
              className={`${textColorClass} font-medium ${hoverColorClass} transition-colors duration-300 text-sm xl:text-base`}
            >
              CONTACT US
            </button>

            <button
              className={`transition-all duration-300 ${isScrolled ? "ml-2" : "-mt-8 ml-2"}`}
              onClick={() => setIsDesktopMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={menuIcon}
                alt="Open menu"
                className={`h-10 w-10 xl:h-12 xl:w-12 object-contain transition-filter duration-200 ${isScrolled ? "filter invert" : "filter invert-0"}`}
              />
            </button>
          </div>
        </nav>

        <button
          className={`lg:hidden transition-colors duration-300 mr-2 sm:mr-4 font-gotham font-light ${mobileTextColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <img
            src={menuIcon}
            alt="Toggle menu"
            className={`h-6 w-6 sm:h-7 sm:w-7 object-contain transition-filter duration-200 ${isScrolled ? "filter invert" : "filter invert-0"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isDesktopMenuOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-[#FF0000] flex flex-col font-gotham font-light items-center justify-center z-[100]">
          <button
            className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors duration-300 font-gotham font-light"
            onClick={() => setIsDesktopMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul className="flex flex-col gap-12 text-center">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => scrollToId(item.id)}
                  className="relative text-white text-xl transition-all duration-300 transform hover:scale-110 group font-gotham font-bold"
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute left-1/2 -bottom-2 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-8 text-center w-full">
            <p className="text-gray-200 text-sm font-gotham font-light">Press ESC to close</p>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 z-40 shadow-sm">
          <nav className="px-2 py-2">
            <ul className="space-y-0">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToId(item.id)}
                    className="block text-red-700 text-xs font-medium py-2 px-4 hover:text-blue-600 hover:bg-gray-100 rounded transition-all duration-300 w-full text-left"
                    aria-label={`Go to ${item.label}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

/* =========================
   App (manages splash lifecycle)
   ========================= */
const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="bg-white">
      <Header />

      {!splashDone && <IntroSplash onFinish={() => setSplashDone(true)} />}

      <main>
        <ImageCarousel />
        {/* Other content */}
      </main>
    </div>
  );
};

export { Header };
export default App;
