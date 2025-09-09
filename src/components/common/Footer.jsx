import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Grid */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo & Socials */}
          <div className="flex flex-col items-start justify-between">
            <div>

            </div>
            <div>

           
            <div className="mb-8">
              <img src={logo} alt="Nayash Logo" className="w-56" />
            </div>
            <div className="flex space-x-4">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 hover:scale-110 transition-all duration-300 group">
                <Instagram className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
                <Facebook className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-300 group">
                <Twitter className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 hover:scale-110 transition-all duration-300 group">
                <BsWhatsapp className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
              </div>
               </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {/* About */}
            <div className="font-gotham">
              <h3 className="text-2xl font-semibold mb-6 tracking-wider">
                ABOUT
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">History</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Our Team</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Brand Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="font-gotham">
              <h3 className="text-xl font-semibold mb-6 tracking-wider">
                SERVICES
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">How to Order</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Our Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Order Status</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Promo</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Payment Method</a></li>
              </ul>
            </div>

            {/* Other */}
            <div>
              <h3 className="text-xl font-semibold mb-6 tracking-wider font-gotham">
                OTHER
              </h3>
              <ul className="space-y-3 font-gotham">
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Help</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:underline text-lg">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-600 text-center">
          <p className="text-gray-400 text-sm font-gotham font-semibold">
            © 2025 NAYASH GROUP. All rights reserved. | WHERE SMILES BEGIN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;