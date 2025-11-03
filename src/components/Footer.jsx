import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">PetZone</h2>
          <p className="text-sm">
            Your trusted marketplace for buying and selling pets.  
            Adopt, don’t shop — find your perfect companion today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/pets" className="hover:text-white">All Pets</Link></li>
            <li><Link to="/sell" className="hover:text-white">Sell Pet</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="mailto:support@petzone.com" className="hover:text-white"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center mt-6 pt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} PetZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
