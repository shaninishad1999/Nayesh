// import React from "react";

// export default function FoundersSection() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-white">
//       {/* Header */}
// <div className="text-center lg:text-left mb-6 sm:mb-10 lg:mb-16">
//   <h1 className="
//     w-full block
//     text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
//     font-light tracking-wide sm:tracking-wider lg:tracking-widest
//     leading-snug sm:leading-tight
//   ">
//     <span className="text-gray-300">FROM THE</span>
//     {' '}
//     <span className="text-[#c34147]">FOUNDERS</span>
//   </h1>
// </div>


//       {/* First Founder Row - Responsive Version */}
//       <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-8 sm:gap-12 items-center ">
//         {/* First Column → Image */}
//         <div className="flex justify-center lg:justify-start items-center w-full h-full">
//           <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-[#c83239] shadow-lg flex-shrink-0" />
//         </div>

//         {/* Second Column → Attribution + Quote */}
//         <div className="flex flex-col lg:flex-row w-full h-full text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10">
//           {/* Attribution (Left side on desktop, bottom aligned) */}
//           <div className="flex flex-col justify-end w-full lg:w-auto whitespace-nowrap">
//             <div
//               className="w-14 sm:w-16 h-2 sm:h-3 bg-[#BD4C4F] mx-auto lg:mx-0 mb-2"
//               style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
//             />
//             <h3 className="font-gotham text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#c34147] font-medium mb-1 sm:mb-2">
//               Satish Kataria
//             </h3>
//             <p className="font-myriad text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-light tracking-wide">
//               Founder
//             </p>
//           </div>

//           {/* Quote (Right side on desktop, vertically centered & right aligned) */}
//           <blockquote className="font-myriad w-full lg:flex lg:items-center">
//             <div className="w-full text-center lg:text-right max-w-2xl mx-auto lg:mx-0">
//               <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
//                 "Every project is personal. For us,
//               </p>
//               <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
//                 and for the people who trust us.
//               </p>
//               <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
//                 We don't just deliver spaces,
//               </p>
//               <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed">
//                 we deliver the feeling of home."
//               </p>
//             </div>
//           </blockquote>
//         </div>
//       </div>

//       {/* Divider Lines */}
//       <div className="mt-7 mb-10 ">
//         <div className="space-y-1">
//           <div className="h-px bg-[#C16367] w-full"></div>
//           <div className="h-px bg-[#C16367] w-full"></div>
//           <div className="h-px bg-[#C16367] w-full"></div>
//         </div>
//       </div>

//       {/* Second Founder Row - Mirrored Layout */}
//       {/* Second Founder Row - Mirrored Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 items-stretch">
//         {/* Left Column - Quote + Attribution */}
//         <div className="flex flex-col w-full text-center lg:text-left order-2 lg:order-1">
//           {/* Attribution (Mobile: comes first, Desktop: stays bottom) */}
//           <div className="flex flex-col items-center lg:items-end w-full order-1 lg:order-2 mt-4 lg:mt-auto">
//             <div
//               className="w-14 sm:w-16 h-2 sm:h-3 bg-[#C16367] mb-1"
//               style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
//             />
//             <h3 className="font-gotham text-xl sm:text-2xl md:text-3xl text-[#c34147] font-medium mb-1">
//               Ar. Sanchi Vasvani
//             </h3>
//             <p className="font-myriad text-base font-light sm:text-lg md:text-xl text-gray-800 tracking-wide">
//               Principal Architect
//             </p>
//           </div>

//           {/* Quote (below attribution in mobile, above attribution in desktop) */}
//           <blockquote className="font-myriad w-full order-2 lg:order-1 mt-3 lg:mt-0 max-w-xl mx-auto lg:mx-0">
//             <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-1 whitespace-normal">
//               "We do everything with care, because <br /> homes mean the world
//               to people. Great design
//             </p>
//             <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-1 whitespace-normal">
//               comes from listening and that's what we do. <br /> Our goal is to
//               make every idea real: efficiently,
//             </p>
//             <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed whitespace-normal">
//               beautifully, and sustainably."
//             </p>
//           </blockquote>
//         </div>

//         {/* Right Column - Image */}
//         <div className="flex justify-center lg:justify-end items-end order-1 lg:order-2 w-auto">
//           <div className="h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 bg-[#c83239] shadow-lg flex-none"></div>
//         </div>
//       </div>

//       {/* Bottom Red Lines */}
//       <div className="mt-6 sm:mt-12">
//         <div className="space-y-1">
//           <div className="h-px bg-[#C16367] w-full"></div>
//           <div className="h-px bg-[#C16367] w-full"></div>
//           <div className="h-px bg-[#C16367] w-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React from "react";
import markImg from "../assets/mark.png";
import founderImg from "../assets/founderImg.jpg";
import principalImg from "../assets/principalImg.jpg"; // सुनिश्चित करें path सही है

export default function FoundersSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-white">
      {/* Header */}
      <header className="text-center lg:text-left mb-6 sm:mb-10 lg:mb-16">
        <h1
          className="
            w-full block
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
            font-light tracking-wide sm:tracking-wider lg:tracking-widest
            leading-snug sm:leading-tight
          "
        >
          <span className="text-gray-300">FROM THE</span>{" "}
          <span className="text-[#c34147]">FOUNDERS</span>
        </h1>
      </header>

      {/* First Founder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-8 sm:gap-12 items-center">
        {/* Image column */}
        <div className="flex justify-center lg:justify-start items-center w-full h-full">
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-[#c83239] shadow-lg flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={founderImg}
              alt="Satish Kataria — Founder"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        </div>

        {/* Attribution + Quote */}
        <div className="flex flex-col lg:flex-row w-full h-full text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10">
          {/* Attribution */}
          <div className="flex flex-col justify-end w-full lg:w-auto whitespace-nowrap">
            <img
              src={markImg}
              alt="signature mark"
              className="w-14 sm:w-16 mx-auto lg:mx-0 mb-2"
              loading="lazy"
            />
            <h3 className="font-gotham text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#c34147] font-medium mb-1 sm:mb-2">
              Satish Kataria
            </h3>
            <p className="font-myriad text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-light tracking-wide">
              Founder
            </p>
          </div>

          {/* Quote */}
          <blockquote className="font-myriad w-full lg:flex lg:items-center">
            <div className="w-full text-center lg:text-right max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
                "Every project is personal. For us,
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
                and for the people who trust us.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-2 sm:mb-1">
                We don't just deliver spaces,
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed">
                we deliver the feeling of home."
              </p>
            </div>
          </blockquote>
        </div>
      </div>

      {/* Divider Lines */}
      <div className="mt-7 mb-10">
        <div className="space-y-1">
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
        </div>
      </div>

      {/* Second Founder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 items-stretch">
        {/* Left Column - Quote + Attribution */}
        <div className="flex flex-col w-full text-center lg:text-left order-2 lg:order-1">
          {/* Attribution */}
          <div className="flex flex-col items-center lg:items-end w-full order-1 lg:order-2 mt-4 lg:mt-auto">
            <img
              src={markImg}
              alt="signature mark"
              className="w-14 sm:w-16 mb-1"
              loading="lazy"
            />
            <h3 className="font-gotham text-xl sm:text-2xl md:text-3xl text-[#c34147] font-medium mb-1">
              Ar. Sanchi Vaswani
            </h3>
            <p className="font-myriad text-base font-light sm:text-lg md:text-xl text-gray-800 tracking-wide">
              Principal Architect
            </p>
          </div>

          {/* Quote */}
          <blockquote className="font-myriad w-full order-2 lg:order-1 mt-3 lg:mt-0 max-w-xl mx-auto lg:mx-0">
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-1 whitespace-normal">
              "We do everything with care, because <br /> homes mean the world
              to people. Great design
            </p>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed mb-1 whitespace-normal">
              comes from listening and that's what we do. <br /> Our goal is to
              make every idea real: efficiently,
            </p>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold leading-relaxed whitespace-normal">
              beautifully, and sustainably."
            </p>
          </blockquote>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center lg:justify-end items-end order-1 lg:order-2 w-auto">
          <div className="h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 bg-[#c83239] shadow-lg flex-none overflow-hidden rounded-md">
            <img
              src={principalImg}
              alt="Ar. Sanchi Vasvani — Principal Architect"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom Red Lines */}
      <div className="mt-6 sm:mt-12">
        <div className="space-y-1">
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
          <div className="h-px bg-[#C16367] w-full" />
        </div>
      </div>
    </section>
  );
}
