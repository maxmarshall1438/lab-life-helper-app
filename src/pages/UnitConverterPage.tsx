
import React from 'react';
import UnitConverter from '@/components/unit-converter/UnitConverter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const UnitConverterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Unit Converter
          </h1>
          <p className="text-xl text-gray-600">
            Convert between common laboratory units of measurement
          </p>
        </div>

        <div className="mb-8">
          <UnitConverter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UnitConverterPage;
