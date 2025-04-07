
import React, { useState } from 'react';
import ChemistryCalculator from '@/components/calculators/ChemistryCalculator';
import BiologyCalculator from '@/components/calculators/BiologyCalculator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CentrifugeCalculator from '@/components/calculators/chemistry/CentrifugeCalculator';
import MolarityCalculator from '@/components/calculators/chemistry/MolarityCalculator';

const CalculatorsPage = () => {
  const [activeTab, setActiveTab] = useState('chemistry');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Lab Calculators
          </h1>
          <p className="text-xl text-gray-600">
            Essential calculators for chemistry and biology lab work
          </p>
        </div>

        <div className="space-y-8">
          <div className="mb-8">
            <ChemistryCalculator />
          </div>
          
          <div className="mb-8">
            <CentrifugeCalculator />
          </div>
          
          <div className="mb-8">
            <MolarityCalculator />
          </div>
          
          <div className="mb-8">
            <BiologyCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalculatorsPage;
