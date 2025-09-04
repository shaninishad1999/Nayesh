import React from "react";
import bgImage from "../assets/crousalImg/1.jpg"; // apni image ka path yaha import karo

export default function NayashLanding() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 relative">
  {/* Responsive Red Guide Lines - Rotated 180deg */}
<div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center rotate-180">
  <div className="relative mt-[34vh] sm:mt-[32vh] lg:mt-[36vh] translate-x-6 sm:translate-x-8 lg:translate-x-10">
    {/* Vertical line */}
    <div className="h-14 sm:h-20 lg:h-24 w-px bg-red-500 mx-auto" />
    {/* Horizontal line (centered on vertical) */}
    <div className="h-px w-8 sm:w-10 lg:w-12 bg-red-500 absolute left-1/2 -translate-x-1/2 -top-[1px]" />
  </div>
</div>




      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 pb-0 lg:px-8 lg:pb-0 py-12">
        {/* Top Section with Typography and Content */}
        <div className="grid lg:grid-cols-[auto,1fr] gap-16 lg:gap-36 mb-16 w-full">
          {/* Left Column - Large Typography */}
          <div className="text-center lg:text-left ">
            <span className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide mr-2">
              WHERE
            </span>
            <span className="inline text-2xl  sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide mr-2">
              SMILES
            </span>
            <span className="inline text-2xl sm:text-4xl lg:block lg:text-5xl xl:text-[105px] font-light text-[#c34147] leading-none tracking-wide">
              BEGIN
            </span>
          </div>

          {/* Right Column - Description Text */}
          <div className="space-y-8 min-w-0 w-full font-gotham ">
            <div className="space-y-0 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center sm:text-left w-full">
              <p className="mb-1">
                <span className="text-[#c34147] font-gotham  font-semibold">Nayash</span> is
                more than a name.
              </p>
              <p className="mb-1 ">
                It’s the spirit of fresh starts and possibilities.
              </p>
              <p className="mb-1">
                It is an{" "}
                <span className="text-[#c34147] font-semibold">
                  architecture and interiors studio
                </span>
                , shaping
              </p>
              <p>premium homes and communities in Pune, and</p>
              <p className="mb-1">
                a{" "}
                <span className="text-[#c34147] font-semibold">
                  construction house
                </span>{" "}
                defining residential
              </p>
              <p className="mb-1">
                spaces within the city. It carries ideas that grow, adapt,
              </p>
              <p>and turn into something lasting.</p>
              <p className="mb-1">
                We hear you, and design around your needs with care,
              </p>
              <p> efficiency, and honest delivery.</p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-48 overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-gotham  font-bold text-center px-6 leading-relaxed ">
              All we want is simple: to see you smiling.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-[#c34147] h-28 lg:h-36 w-full -mt-12"></div>
    </div>
  );
}
