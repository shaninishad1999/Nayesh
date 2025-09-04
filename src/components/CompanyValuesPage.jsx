import React from "react";

const CompanyValuesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Values Section */}
      <div className="bg-[#BE4B50] text-white py-16 pb-40 px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Our Values Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider">
              OUR <span className="font-gotham">VALUES</span>
            </h1>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Promise-Driven Delivery */}
            <div className="text-left relative pb-6 md:pb-0">
              {/* Vertical line (desktop) */}
              <div className="hidden md:block absolute top-0 right-0 h-full border-r-2 border-gray-300"></div>
              <div className="hidden md:block absolute top-0 right-2 h-full border-r-2 border-gray-300"></div>

              {/* Horizontal line (mobile) */}
              <div className="block md:hidden absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
              <div className="block md:hidden absolute bottom-2 left-0 w-full border-b-2 border-gray-300"></div>

              <h2 className="text-3xl font-light mb-12 tracking-wide">
                PROMISE-DRIVEN
                <br />
                <span className="font-gotham">DELIVERY</span>
              </h2>
              <p className="text-sm leading-relaxed opacity-90 pr-8  md:pr-4 font-gotham font-semibold">
                Homes that embrace your <br /> everyday rituals, from morning <br /> light in
                the kitchen to quiet corners <br /> made for unwinding.
              </p>
            </div>

            {/* Human-First Design */}
            <div className="text-left relative pb-6 md:pb-0">
              {/* Vertical line (desktop) */}
              <div className="hidden md:block absolute top-0 right-0 h-full border-r-2 border-gray-300"></div>
              <div className="hidden md:block absolute top-0 right-2 h-full border-r-2 border-gray-300"></div>

              {/* Horizontal line (mobile) */}
              <div className="block md:hidden absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
              <div className="block md:hidden absolute bottom-2 left-0 w-full border-b-2 border-gray-300"></div>

              <h2 className="text-3xl font-light mb-12 tracking-wide ">
                HUMAN-FIRST
                <br />
                <span className="font-gotham">DESIGN</span>
              </h2>
              <p className="text-sm leading-relaxed opacity-90 font-gotham font-semibold ">
                Clear conversations, <br /> honest timelines, and a journey <br /> without
                hidden turns — so you  <br />always know where you stand.
              </p>
            </div>

            {/* Quality That Lasts */}
            <div className="text-left relative">
              <h2 className="text-3xl font-light mb-12 tracking-wide">
                <span className="font-gotham">QUALITY</span>
                <br />
                THAT LASTS
              </h2>
              <p className="text-sm leading-relaxed opacity-90 pr-8 md:pr- font-gotham font-light">
                Craftsmanship that lingers <br /> in the little things: solid doors <br />
                that close softly, finishes that age <br /> with grace, and spaces
                built to  <br /> hold generations of memories.
              </p>
            </div>
          </div>

          {/* Separator Lines */}
          <div className="border-t border-white border-opacity-30 mb-1"></div>
          <div className="border-t border-white border-opacity-30 mb-1"></div>
          <div className="border-t border-white border-opacity-30 mb-12"></div>

          {/* How We Work Header */}
          <div className="text-right ">
            <h1 className="text-4xl md:text-7xl font-light tracking-wider ">
              HOW WE <span className="font-gotham">WORK</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Process Section - overlap half red half white */}
      <div className="relative -mt-32 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Listen */}
          <div className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]">
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
          <div className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]">
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
          <div className="bg-[#c9c9c9] shadow-xl p-8 flex flex-col items-center text-center min-h-[450px]">
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
