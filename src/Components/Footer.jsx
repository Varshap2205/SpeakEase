import React from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="services" smooth={true} duration={500} className="cursor-pointer hover:text-primary">
            Services
          </Link>
          <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-primary">
            About
          </Link>
          <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-primary">
            Contact
          </Link>
          <Link to="pricing" smooth={true} duration={500} className="cursor-pointer hover:text-primary">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
