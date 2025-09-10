import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      console.log("Email submitted:", email);
      // Add your submission logic here
      setEmail("");
    }
  };

  return (
    <div className="relative bg-[#BE4B50] py-24" id="contact">
      {/* White line on top - full width */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full h-[2px] bg-white"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white"></div>

      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-2xl mb-4 leading-relaxed">
          <span className="text-gray-300 font-light">LET'S CATCH UP OVER </span>
          <br />
          <span className="font-gotham text-white">COFFEE AND BLUEPRINTS.</span>
        </h2>

        {/* Newsletter Input */}
        <div className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto gap-0">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 text-lg md:text-xl rounded-md sm:rounded-r-none focus:outline-none text-gray-700 placeholder-gray-500 border-none mb-2 sm:mb-0"
            required
          />
          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-gray-400 px-8 py-1 font-gotham text-lg md:text-3xl rounded-md sm:rounded-l-none hover:bg-black hover:text-white transition-colors duration-300 font-thin cursor-pointer"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
