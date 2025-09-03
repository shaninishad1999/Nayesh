import React from "react";

const NayashGroupCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header Text */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
          As <span className="text-red-600 font-semibold">Nayash Group</span>,
          everything we do is shaped by one belief: It's not just about building
          walls or sketching plans — it's about creating places that carry
          comfort, joy, and belonging.
        </p>
      </div>

      {/* Main Card Layout */}
      <div className="relative bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-96">
          {/* OUR ETHOS - Mobile (top) */}
          <div className="block md:hidden mb-6">
            <div className="flex flex-col justify-center items-center">
                
              <h1 className="text-4xl tracking-widest text-center whitespace-nowrap">
                <span className="text-gray-400">OUR</span>{" "}
                <span className="text-red-600">ETHOS</span>
              </h1>
              <div className="w-full max-w-xs h-1 bg-red-500 mt-3"></div>
            </div>
          </div>

          {/* Left Section - Upscale Housing (Bottom) */}
          <div className="w-full md:w-1/3 bg-red-700 text-white p-6 flex flex-col justify-end">
            <h3 className="text-lg md:text-xl font-bold mb-2 tracking-wide">
              UPSCALE
              <br />
              HOUSING:
            </h3>
            <p className="text-red-200 text-base md:text-xl font-light tracking-wider">
              STRONG IN ITS
              <br />
              FOUNDATION.
            </p>
          </div>

          {/* Center Section - Architectural Solutions (Top) */}
          <div className="w-full md:w-1/3 bg-red-500 text-white p-6 flex flex-col justify-start">
            <h3 className="text-lg md:text-xl font-bold mb-2 tracking-wide">
              ARCHITECTURAL
              <br />
              SOLUTIONS:
            </h3>
            <p className="text-red-200 text-base md:text-xl font-light tracking-wider">
              BOLD IN
              <br />
              THOUGHT.
            </p>
          </div>

          {/* Right Section - Interior Designing (Bottom) */}
          <div className="w-full md:w-1/3 bg-red-300 text-white p-6 flex flex-col justify-end">
            <h3 className="text-lg md:text-xl font-bold mb-2 tracking-wide">
              INTERIOR
              <br />
              DESIGNING:
            </h3>
            <p className="text-red-200 text-base md:text-xl font-light tracking-wider">
              TRUSTED IN
              <br />
              EXECUTION.
            </p>
          </div>

          {/* OUR ETHOS - Desktop (side) */}
          <div className="hidden md:flex justify-center">
            <h1 className="text-6xl px-4 tracking-widest [writing-mode:vertical-rl] rotate-180">
              <span className="text-gray-400">OUR</span>{" "}
              <span className="text-red-600">ETHOS</span>
            </h1>
            <div className="w-2 bg-red-500 mr-4"></div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="p-6 md:p-8 text-center md:text-right bg-white md:mr-20">
          <p className="text-gray-600 mb-2">
            That's where our identity finds its heart.
          </p>
          <p className="text-gray-700">
            Because in the end, a home is about stories,
            <span className="text-red-600 font-semibold">
              {" "}
              filled with trust, happiness, <br className="hidden md:block" /> and belonging.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NayashGroupCard;