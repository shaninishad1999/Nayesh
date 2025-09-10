// TermsModal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const TermsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (modalRef.current) modalRef.current.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // basic focus trap
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused.current) previouslyFocused.current.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terms and Conditions"
      className="fixed inset-0 z-[1000001] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[1000000]"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-[1000002] max-w-3xl w-full bg-white text-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[85vh]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold">Terms &amp; Conditions</h2>
          <button
            onClick={onClose}
            aria-label="Close Terms"
            className="ml-auto rounded-full p-2 hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-800">
          <p className="font-semibold">Last updated: January 1, 2025</p>

          <section>
            <h3 className="font-semibold mt-2">1. Introduction</h3>
            <p>
              These Terms govern your access to and use of the website and services provided by NAYASH GROUP.
              By using the site you agree to these Terms. If you do not agree, do not use the site.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mt-2">2. Use of Website</h3>
            <p>
              You may use the website only for lawful purposes and in accordance with these Terms. You must not use the site in any
              way that causes damage or impairment to availability or accessibility.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mt-2">3. Intellectual Property</h3>
            <p>
              The content on this site (text, images, logos, designs) is owned or licensed by NAYASH GROUP. Reproduction or redistribution
              without permission is prohibited.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mt-2">4. Limitation of Liability</h3>
            <p>
              The site is provided "as is" and NAYASH GROUP disclaims warranties to the fullest extent permitted by law.
              We are not liable for indirect or consequential losses from your use of the site.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mt-2">5. Changes</h3>
            <p>
              We may update these Terms from time to time. Material changes will be posted here with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mt-2">6. Contact</h3>
            <p>
              Questions about these Terms? Contact us at: <a href="mailto:legal@nayash.example" className="text-indigo-600 hover:underline">nayashdesignstudio@gmail.com</a>
            </p>
          </section>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TermsModal;
