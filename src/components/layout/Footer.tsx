
import React from 'react';
import { FlaskConical } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-lab-blue font-semibold text-lg mb-4">
            <FlaskConical className="h-5 w-5" />
            <span>LabAssist</span>
          </div>
          <p className="text-sm text-gray-500 text-center mb-2">
            Your everyday lab companion for chemistry and biology calculations.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} LabAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
