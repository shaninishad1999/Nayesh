import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus on escape key
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

  const menuItems = [
    { path: "/founders", label: "FROM THE FOUNDERS" },
    { path: "/ethos", label: "OUR ETHOS" },
    { path: "/offer", label: "WHAT WE OFFER" },
    { path: "/contact", label: "CONTACT US" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <div className="ml-2 sm:ml-8">
          <img
            src={logo}
            alt="MyLogo"
            className={`w-auto transition-all duration-300 ${
              isScrolled ? "h-10 sm:h-12" : "h-12 sm:h-16"
            }`}
          />
        </div>

        {/* Desktop Menu - Hidden on mobile */}
        <nav className="hidden lg:flex gap-8 mr-8 items-center">
          {menuItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-white font-gotham font-light hover:text-blue-400 transition-colors duration-300 text-sm xl:text-base"
            >
              {item.label}
            </Link>
          ))}

          {/* Contact + Desktop Hamburger Container */}
          <div className="relative flex items-center gap-6 xl:gap-8">
            <Link
              to="/contact"
              className="text-white font-medium hover:text-blue-400 transition-colors duration-300 text-sm xl:text-base"
            >
              CONTACT US
            </Link>

            {/* Desktop Hamburger Button */}
            <button
              className={`text-white hover:text-blue-400 transition-all duration-300 ${
                isScrolled ? "ml-2" : "-mt-8 ml-2"
              }`}
              onClick={() => setIsDesktopMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 xl:h-7 xl:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger - Visible on mobile and tablet */}
        <button
          className="lg:hidden text-white hover:text-blue-400 transition-colors duration-300 mr-2 sm:mr-4 font-gotham font-light"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Full-Screen Modal Menu */}
      {isDesktopMenuOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-black/90 backdrop-blur-lg flex flex-col  font-gotham font-light items-center justify-center z-[999]">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-blue-400 transition-colors duration-300 font-gotham font-light"
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

          {/* Desktop Menu Links */}
          <ul className="flex flex-col gap-12 text-center">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className="relative text-white text-xl transition-all duration-300 transform hover:scale-110 group font-gotham font-light"
                  onClick={() => setIsDesktopMenuOpen(false)}
                >
                  {item.label}
                  <span className="absolute left-1/2 -bottom-2 w-0 h-1 font-gotham font-light bg-blue-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Info (inside modal) */}
          <div className="absolute bottom-8 text-center w-full">
            <p className="text-white/60 text-sm font-gotham font-light">
              Press ESC to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile Simple Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/70 backdrop-blur-sm z-40">
          <nav className="px-2 py-2">
            <ul className="space-y-0">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="block text-white text-xs font-medium py-1 px-3 hover:text-blue-400 hover:bg-white/10 rounded transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
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

  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      alt: "Beautiful landscape 1",
      heading: "Welcome to Our World",
      subheading:
        "Discover amazing experiences and create unforgettable memories",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
      alt: "Beautiful landscape 2",
      heading: "Explore Nature's Beauty",
      subheading:
        "Immerse yourself in breathtaking landscapes and serene environments",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
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

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const { firstWord, remainingWords } = splitHeading(
    images[currentIndex].heading
  );
  const { firstRow, secondRow } = splitSubheading(
    images[currentIndex].subheading
  );

  return (
    <>
      <div className="relative w-full h-screen">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Text Overlay - Right Side */}
        <div className="absolute inset-0 flex items-center justify-end ">
          <div className="text-right ">
            {/* First word - First Line */}
            <h1 className="text-white text-3xl font-gotham leading-none sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl uppercase  leading-none animate-fadeInUp">
              {firstWord}
            </h1>

            {/* Remaining words - Second Line */}
            {remainingWords && (
              <h1 className="text-white text-3xl font-gotham  sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl uppercase   leading-none animate-fadeInUp animation-delay-200">
                {remainingWords}
              </h1>
            )}

            {/* Subheading - First Row */}
            <p className="text-white/90 text-base sm:text-lg font-gotham  uppercase mb-3 md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed animate-fadeInUp animation-delay-400">
              {firstRow}
            </p>

            {/* Subheading - Second Row */}
            {secondRow && (
              <p className="text-white/90 text-base sm:text-lg font-gotham  uppercase md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed animate-fadeInUp animation-delay-600">
                {secondRow}
              </p>
            )}
          </div>
        </div>

        {/* Dots Navigation - Moved higher */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
            opacity: 0;
          }
        `}</style>
      </div>
      {/* Bottom Tagline Bar */}
      
<div className="absolute bottom-0 left-0 w-full bg-[#333333] py-3 sm:py-6">
  <div className="container mx-auto px-2 sm:px-6">
    <p
  className="
    text-white text-center 
    text-sm max-[375px]:text-xs 
    sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl 
    tracking-tight sm:tracking-[0.05em] 
    leading-snug break-words font-gotham font-light
  "
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
    <div className="min-h-screen bg-gray-50">
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
