
import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lab-blue font-semibold text-xl">
          <FlaskConical className="h-7 w-7" />
          <span>Marshall Scientific Lab Assistant</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-lab-blue font-medium transition">Home</Link>
          <Link to="/unit-converter" className="text-gray-600 hover:text-lab-blue font-medium transition">Unit Converter</Link>
          <Link to="/calculators" className="text-gray-600 hover:text-lab-blue font-medium transition">Calculators</Link>
          <Link to="/references" className="text-gray-600 hover:text-lab-blue font-medium transition">References</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
