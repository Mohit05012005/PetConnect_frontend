import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-green-400 text-white py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Pet Today 🐶</h1>
        <p className="text-lg mb-6">
          Discover lovable pets waiting for a new home. Adopt, don’t shop!
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
