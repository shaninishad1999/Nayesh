// NewsletterSection.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // safe env reading: supports CRA (REACT_APP_) and Vite (VITE_)
  const ACCESS_KEY =
    (typeof process !== "undefined" && process.env && process.env.REACT_APP_WEB3FORMS_KEY) ||
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_WEB3FORMS_KEY) ||
    "";

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!ACCESS_KEY) {
      toast.error("Configuration error: missing API key.");
      console.error("Missing WEB3FORMS access key. Set REACT_APP_WEB3FORMS_KEY (CRA) or VITE_WEB3FORMS_KEY (Vite).");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        access_key: ACCESS_KEY,
        subject: "Newsletter signup — Nayash Group",
        email,
        data: { form: "newsletter", page: "homepage", timestamp: new Date().toISOString() },
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success !== false) {
        toast.success(json.message || "Thanks — your email has been submitted!");
        setEmail("");
      } else {
        toast.error(json.message || "Submission failed. Please try again.");
        console.error("web3forms error:", json);
      }
    } catch (err) {
      console.error("Web3Forms submit error:", err);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#BE4B50] py-24" id="contact" aria-labelledby="newsletter-heading">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full h-[2px] bg-white" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />

      <div className="text-center px-6 max-w-4xl mx-auto">
        <h2 id="newsletter-heading" className="text-2xl md:text-2xl mb-4 leading-relaxed">
          <span className="text-gray-300 font-light">LET'S CATCH UP OVER </span>
          <br />
          <span className="font-gotham text-white">COFFEE AND BLUEPRINTS.</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto gap-0" aria-label="Newsletter signup form">
          <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
          <label htmlFor="newsletter-email" className="sr-only">Your Email</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 text-lg md:text-xl rounded-md sm:rounded-r-none focus:outline-none text-gray-700 placeholder-gray-500 border-none mb-2 sm:mb-0"
            required
            aria-required="true"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-gray-400 px-8 py-1 font-gotham text-lg md:text-3xl rounded-md sm:rounded-l-none hover:bg-black hover:text-white transition-colors duration-300 font-thin cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "SENDING..." : "SUBMIT"}
          </button>
        </form>

        <p className="mt-6 text-xs text-white/60">We respect your privacy — no spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
