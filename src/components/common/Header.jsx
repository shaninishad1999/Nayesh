import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/menuIcon.png";
import colorLogo from "../../assets/colorLogo.png";
import img1 from "../../assets/crousalImg/1.jpg";
import img2 from "../../assets/crousalImg/2.jpg";
import img3 from "../../assets/crousalImg/3.jpg";

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
    // If already on home, scroll to top smoothly
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

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });

    setIsDesktopMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-[99999] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <div className="ml-2 sm:ml-4">
          <Link to="/" aria-label="Go to home" onClick={handleLogoClick}>
            <img
              src={isScrolled ? colorLogo : logo}
              alt="MyLogo"
              className={`w-auto transition-all duration-300 ease-out ${
                isScrolled
                  ? "h-12 sm:h-14 md:h-16 lg:h-20"
                  : "h-14 sm:h-16 md:h-20 lg:h-24"
              }`}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
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
              className={`transition-all duration-300 ${
                isScrolled ? "ml-2" : "-mt-8 ml-2"
              }`}
              onClick={() => setIsDesktopMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={menuIcon}
                alt="Open menu"
                className={`h-10 w-10 xl:h-12 xl:w-12 object-contain transition-filter duration-200 ${
                  isScrolled ? "filter invert" : "filter invert-0"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden transition-colors duration-300 mr-2 sm:mr-4 font-gotham font-light ${mobileTextColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <img
            src={menuIcon}
            alt="Toggle menu"
            className={`h-6 w-6 sm:h-7 sm:w-7 object-contain transition-filter duration-200 ${
              isScrolled ? "filter invert" : "filter invert-0"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Desktop Full-Screen Modal Menu */}
      {isDesktopMenuOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-white/95 flex flex-col font-gotham font-light items-center justify-center z-[999]">
          <button
            className="absolute top-6 right-6 text-gray-900 hover:text-blue-600 transition-colors duration-300 font-gotham font-light"
            onClick={() => setIsDesktopMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="flex flex-col gap-12 text-center">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => scrollToId(item.id)}
                  className="relative text-gray-900 text-xl transition-all duration-300 transform hover:scale-110 group font-gotham font-light"
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute left-1/2 -bottom-2 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-8 text-center w-full">
            <p className="text-gray-500 text-sm font-gotham font-light">
              Press ESC to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile Dropdown */}
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

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    {
      src: img1,
      alt: "Beautiful landscape 1",
      heading: "The Balcony",
      subheading:
        "Discover amazing experiences and create unforgettable memories",
    },
    {
      src: img2,
      alt: "Beautiful landscape 2",
      heading: "Explore Nature's Beauty",
      subheading:
        "Immerse yourself in breathtaking landscapes and serene environments",
    },
    {
      src: img3,
      alt: "Beautiful landscape 3",
      heading: "Adventure Awaits",
      subheading: "Embark on journeys that will transform your perspective",
    },
  ];

  // Function to split heading into first word and remaining words
  const splitHeading = (heading) => {
    const words = heading.split(" ");
    const firstWord = words[0];
    const remainingWords = words.slice(1).join(" ");
    return { firstWord, remainingWords };
  };

  // Function to split subheading into two rows with fewer words in second row
  const splitSubheading = (subheading) => {
    const words = subheading.split(" ");
    const totalWords = words.length;
    const firstRowWords = Math.ceil(totalWords * 0.7); // 70% words in first row
    const firstRow = words.slice(0, firstRowWords).join(" ");
    const secondRow = words.slice(firstRowWords).join(" ");
    return { firstRow, secondRow };
  };

  // Auto-slide every 4 seconds with text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300); // Half of the transition duration
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const { firstWord, remainingWords } = splitHeading(
    images[currentIndex].heading
  );
  const { firstRow, secondRow } = splitSubheading(
    images[currentIndex].subheading
  );

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Image with transition */}
        <div className="relative w-full h-full">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
              isTransitioning ? "scale-110 opacity-80" : "scale-100 opacity-100"
            }`}
          />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Text Overlay - Right Side with enhanced animations */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="text-right ">
            {/* First word - First Line with slide animation */}
            <h1
              className={`text-white font-gotham leading-none uppercase transition-all duration-700 ease-out transform ${
                isTransitioning
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100 animate-slideInRight"
              } text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl`}
            >
              {firstWord}
            </h1>

            {/* Remaining words - Second Line */}
            {remainingWords && (
              <h1
                className={`text-white font-gotham leading-none uppercase transition-all duration-700 ease-out transform ${
                  isTransitioning
                    ? "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100 animate-slideInRight animation-delay-200"
                } text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl`}
              >
                {remainingWords}
              </h1>
            )}

            {/* Subheading - First Row */}
            <p
              className={`text-white/90 font-gotham uppercase mb-3 md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed transition-all duration-700 ease-out transform ${
                isTransitioning
                  ? "translate-y-8 opacity-0"
                  : "translate-y-0 opacity-100 animate-fadeInUp animation-delay-400"
              } text-sm sm:text-base md:text-lg`}
            >
              {firstRow}
            </p>

            {/* Subheading - Second Row */}
            {secondRow && (
              <p
                className={`text-white/90 font-gotham uppercase md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed transition-all duration-700 ease-out transform ${
                  isTransitioning
                    ? "translate-y-8 opacity-0"
                    : "translate-y-0 opacity-100 animate-fadeInUp animation-delay-600"
                } text-sm sm:text-base md:text-lg`}
              >
                {secondRow}
              </p>
            )}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
             style={{ bottom: "20px" /* larger bottom on mobile to avoid tagline overlap; overridden by media queries in Tailwind */ }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(120px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-120px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 1s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 1s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.8s ease-out forwards;
          }

          .animation-delay-200 {
            animation-delay: 0.25s;
            opacity: 0;
          }

          .animation-delay-400 {
            animation-delay: 0.5s;
            opacity: 0;
          }

          .animation-delay-600 {
            animation-delay: 0.75s;
            opacity: 0;
          }

          .animation-delay-800 {
            animation-delay: 1s;
            opacity: 0;
          }

          /* Additional smooth transitions */
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Custom easing for better animations */
          .ease-smooth {
            transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* small-screen adjustments for the dots and tagline using raw CSS fallback */
          @media (max-width: 640px) {
            .dots-mobile-adjust {
              bottom: 140px;
            }
          }
        `}</style>
      </div>

      {/* Bottom Tagline Bar - made responsive: wraps text on small screens */}
      <div className="relative w-full bg-[#333333] py-3 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <p
            className="
              text-white text-center
              text-xs sm:text-sm md:text-lg lg:text-2xl
              leading-tight
              whitespace-normal break-words
              "
            style={{ fontFamily: "GothamLight" }}
          >
            ARCHITECTURE &nbsp;&nbsp;||&nbsp;&nbsp; INTERIORS
            &nbsp;&nbsp;||&nbsp;&nbsp; PREMIUM HOMES
          </p>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className=" bg-white">
      <Header />
      <main>
        <ImageCarousel />
        {/* Other content can go here */}
      </main>
    </div>
  );
};

export { Header, ImageCarousel };
export default App;
