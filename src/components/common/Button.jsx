import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
    >
      {label}
    </button>
  );
};

export default Button;
