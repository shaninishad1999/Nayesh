import React from "react";

export default function FoundersSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-white">
      {/* Header */}
      <div className="text-center lg:text-left mb-10 sm:mb-16">
       <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-widest leading-tight flex flex-wrap gap-4">
  <span className="text-gray-300 inline-block">FROM THE</span>
  <span className="text-red-600 inline-block">FOUNDERS</span>
</h1>

      </div>

      {/* First Founder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center mb-16 sm:mb-24">
        {/* First Column */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:items-end space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Red Box */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-red-600 shadow-lg"></div>
          {/* Attribution */}
          <div className="text-center sm:text-left">
            {/* Red Shape */}
            <div
              className="w-16 sm:w-20 h-3 sm:h-4 bg-red-600 mx-auto sm:mx-0 mb-2"
              style={{
                clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)",
              }}
            ></div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-red-600 font-medium mb-1 sm:mb-2 whitespace-nowrap">
              Satish Kataria
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold tracking-wide">
              Founder
            </p>
          </div>
        </div>
        {/* Second Column */}
        <div className="text-center lg:text-right">
          <blockquote className="mb-10 sm:mb-12">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold mb-2 sm:mb-1">
              "Every project is personal. For us,
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold mb-2 sm:mb-1">
              and for the people who trust us.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold mb-2 sm:mb-1">
              We don't just deliver spaces,
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold">
              we deliver the feeling of home."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="mt-10 mb-20 sm:mt-16">
        <div className="space-y-1">
          <div className="h-px bg-red-600 w-full"></div>
          <div className="h-px bg-red-600 w-full"></div>
          <div className="h-px bg-red-600 w-full"></div>
        </div>
      </div>
      {/* Second Founder Row - Mirrored Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2  sm:gap-0 items-center">
        {/* Quote Column (Now First) */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <blockquote className="mb-10 sm:mb-12">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold mb-2 sm:mb-1">
              "We do everything with care, because homes mean the world to
              people. Great design
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold mb-2 sm:mb-1">
              comes from listening and that's what we do. Our goal is to make
              every idea real:
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold">
              efficiently, beautifully, and sustainably."
            </p>
          </blockquote>
        </div>
        {/* Image and Attribution Column (Now Second) */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-end items-center sm:items-end space-y-6 sm:space-y-0 sm:space-x-6 order-1 lg:order-2">
          {/* Attribution */}
          <div className="text-center sm:text-right order-2 sm:order-1">
            {/* Red Shape */}
            <div
              className="w-16 sm:w-20 h-3 sm:h-4 bg-red-600 mx-auto sm:ml-auto sm:mr-0 mb-2"
              style={{
                clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
              }}
            ></div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-red-600 font-medium mb-1 sm:mb-2 whitespace-nowrap">
              Ar. Sanchi Vasvani
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold tracking-wide">
              Principal Architect
            </p>
          </div>
          {/* Red Box */}
          {/* Red Box */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-red-600 shadow-lg order-1 sm:order-2"></div>
        </div>
      </div>

      {/* Bottom Red Lines */}
      <div className="mt-10 sm:mt-16">
        <div className="space-y-1">
          <div className="h-px bg-red-600 w-full"></div>
          <div className="h-px bg-red-600 w-full"></div>
          <div className="h-px bg-red-600 w-full"></div>
        </div>
      </div>
    </div>
  );
}
