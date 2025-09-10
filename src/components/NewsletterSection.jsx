// NewsletterSection.jsx
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // Env detection (build-time values). Ensure you set these in your host for Production.
  // CRA: REACT_APP_WEB3FORMS_KEY
  // Vite: VITE_WEB3FORMS_KEY
  const ACCESS_KEY =
    (typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_WEB3FORMS_KEY) ||
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_WEB3FORMS_KEY) ||
    "";

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  // ref for close button inside modal for focus management
  const closeBtnRef = useRef(null);
  // timer ref for auto-close of modal
  const modalTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    };
  }, []);

  const openThanksModal = () => {
    setShowThanks(true);
    // auto-close after 4s
    modalTimerRef.current = setTimeout(() => {
      setShowThanks(false);
    }, 4000);
  };

  const closeThanksModal = () => {
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }
    setShowThanks(false);
  };

  useEffect(() => {
    if (showThanks && closeBtnRef.current) {
      // move focus into modal for accessibility
      closeBtnRef.current.focus();
    }
  }, [showThanks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // guard against double submit

    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!ACCESS_KEY) {
      toast.error("Configuration error: missing API key.");
      console.error(
        "Missing WEB3FORMS access key. Set REACT_APP_WEB3FORMS_KEY (CRA) or VITE_WEB3FORMS_KEY (Vite)."
      );
      return;
    }

    setLoading(true);

    // Abort if fetch takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s

    try {
      const payload = {
        access_key: ACCESS_KEY,
        subject: "Newsletter signup — Nayash Group",
        email: email.trim(),
        data: {
          form: "newsletter",
          page: "homepage",
          timestamp: new Date().toISOString(),
        },
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let json;
      try {
        json = await res.json();
      } catch (parseErr) {
        console.error("Failed to parse JSON from web3forms:", parseErr);
        toast.error("Unexpected server response. Try again later.");
        return;
      }

      // Provider shape may differ — adjust if web3forms returns different key
      const succeeded =
        res.ok && (json.success === true || json.success == null);

      if (succeeded) {
        // ❌ toast.success हटाया गया
        setEmail("");
        // ✅ सिर्फ thank-you popup/modal show होगा
        openThanksModal();
      } else {
        // Show provider message when available
        const msg =
          json.message || json.error || "Submission failed. Please try again.";
        toast.error(msg);
        console.error("web3forms error:", json);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        toast.error("Request timed out. Please try again.");
      } else {
        console.error("Web3Forms submit error:", err);
        toast.error("Network error. Please try again later.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <section
      className="relative bg-[#BE4B50] py-24"
      id="contact"
      aria-labelledby="newsletter-heading"
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full h-[2px] bg-white" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />

      <div className="text-center px-6 max-w-4xl mx-auto">
        <h2
          id="newsletter-heading"
          className="text-2xl md:text-2xl mb-4 leading-relaxed"
        >
          <span className="text-gray-300 font-light">LET'S CATCH UP OVER </span>
          <br />
          <span className="font-gotham text-white">COFFEE AND BLUEPRINTS.</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto gap-0"
          aria-label="Newsletter signup form"
          noValidate
        >
          {/* honeypot for bots - keep hidden from users but present in DOM */}
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <label htmlFor="newsletter-email" className="sr-only">
            Your Email
          </label>
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
            aria-disabled={loading}
            className="bg-gray-900 text-gray-400 px-8 py-1 font-gotham text-lg md:text-3xl rounded-md sm:rounded-l-none hover:bg-black hover:text-white transition-colors duration-300 font-thin cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "SENDING..." : "SUBMIT"}
          </button>
        </form>

        <p className="mt-6 text-xs text-white/60">
          We respect your privacy — no spam. Unsubscribe anytime.
        </p>

        {/* NOTE for devs: If your key is secret, do NOT expose it in client build.
            Instead create a serverless endpoint (e.g., /api/newsletter) which holds the secret in environment variables and forwards the request to Web3Forms. */}
      </div>

      {showThanks && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thanks-title"
          className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
        >
          {/* Enhanced overlay with animation */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
            onClick={closeThanksModal}
          />

          {/* Enhanced modal with red theme */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden z-10 transform transition-all duration-500 scale-100 opacity-100 animate-in">
            {/* Top decorative section */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 w-full"></div>

            {/* Content section */}
            <div className="p-8 text-center relative">
              {/* Success icon with animation */}
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-4 border-red-300 opacity-30 animate-ping"></div>
                <div
                  className="absolute inset-2 rounded-full border-2 border-red-400 opacity-40 animate-ping"
                  style={{ animationDelay: "200ms" }}
                ></div>
              </div>

              {/* Thank you message */}
              <h3
                id="thanks-title"
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                🎉 Thank You!
              </h3>

              <p className="text-gray-600 mb-2 text-lg leading-relaxed">
                Your email has been successfully submitted.
              </p>

              <p className="text-gray-500 text-sm mb-6">
                We'll get back to you soon with exciting updates!
              </p>

              {/* Progress bar for auto-close */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-1.5 rounded-full transition-all duration-75 ease-linear w-full"
                  style={{
                    animation: "progress 5s linear forwards",
                  }}
                ></div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  ref={closeBtnRef}
                  onClick={closeThanksModal}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Perfect! ✨
                </button>
              </div>

              {/* Floating particles effect */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-red-500 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute bottom-12 left-8 w-1 h-1 bg-red-300 rounded-full opacity-40 animate-ping"></div>
              <div
                className="absolute bottom-8 right-4 w-2.5 h-2.5 bg-red-400 rounded-full opacity-30 animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Close button - redesigned */}
            <button
              onClick={closeThanksModal}
              aria-label="Dismiss"
              className="absolute top-4 right-4 w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.28 5.22a.75.75 0 011.06 0L10 7.88l2.66-2.66a.75.75 0 111.06 1.06L11.06 8.94l2.66 2.66a.75.75 0 11-1.06 1.06L10 10l-2.66 2.66a.75.75 0 11-1.06-1.06L8.94 8.94 6.28 6.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
