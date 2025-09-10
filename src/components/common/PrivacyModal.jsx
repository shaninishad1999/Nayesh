// PrivacyModal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const PrivacyModal = ({ isOpen, onClose }) => {
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
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
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
      aria-label="Privacy Policy"
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
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#c34147] to-[#cb626b] bg-clip-text text-transparent">
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="ml-auto rounded-full p-2 py-2 bg-[#c34147] hover:bg-[#cb626b] text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-sm leading-relaxed">
          <p className="font-semibold text-[#c34147]">Last updated: January 1, 2025</p>
          <p>
            Welcome to NAYASH GROUP. We respect your privacy and are committed
            to protecting your personal data. This policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website.
          </p>

          <h3 className="font-semibold mt-2 border-b-2 border-[#cb626b] inline-block">
            Information We Collect
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal identifiers (name, email, phone) you provide.</li>
            <li>Usage data (pages visited, timestamps) collected automatically.</li>
            <li>Cookies and similar technologies.</li>
          </ul>

          <h3 className="font-semibold mt-2 border-b-2 border-[#c34147] inline-block">
            How We Use Your Information
          </h3>
          <p>
            We use your information to provide and improve services, communicate
            with you, and comply with legal obligations.
          </p>

          <h3 className="font-semibold mt-2 border-b-2 border-[#cb626b] inline-block">
            Third Parties
          </h3>
          <p>
            We may share information with service providers who perform services
            on our behalf. We do not sell personal data.
          </p>

          <h3 className="font-semibold mt-2 border-b-2 border-[#c34147] inline-block">
            Your Rights
          </h3>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, delete, or restrict processing of your information. Contact
            us for any requests.
          </p>

          <h3 className="font-semibold mt-2 border-b-2 border-[#cb626b] inline-block">
            Contact
          </h3>
          <p>
            For privacy inquiries, email:{" "}
            <a
              href="mailto:privacy@nayash.example"
              className="text-[#cb626b] hover:underline"
            >
              nayashdesignstudio@gmail.com
            </a>
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#c34147] to-[#cb626b] text-white hover:opacity-90 transition"
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

export default PrivacyModal;
