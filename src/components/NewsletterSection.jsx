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
    <div className="relative bg-[#BE4B50] py-24">
      {/* White line on top - full width */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2  w-full h-[2px] bg-white"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white"></div>
      
      {/* White line above text */}
      
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-white text-2xl md:text-3xl font-light mb-12 leading-relaxed">
          LET'S CATCH UP OVER <br />
          <span className="font-semibold">COFFEE AND BLUEPRINTS.</span>
        </h2>

        {/* Newsletter Input */}
      <div className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto gap-0">
  <input
    type="email"
    placeholder="Your Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="flex-grow px-4 py-3 text-lg md:text-xl rounded-l-md sm:rounded-r-none rounded-r-md focus:outline-none text-gray-700 placeholder-gray-500 border-none"
    required
  />
  <button
    onClick={handleSubmit}
    className="bg-gray-900 text-gray-300 px-8 py-3 text-lg md:text-3xl rounded-r-md sm:rounded-l-none rounded-l-md hover:bg-black hover:text-white transition-colors duration-300 font-semibold cursor-pointer"
  >
    SUBMIT
  </button>
</div>

      </div>
    </div>
  );
}