
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnitConverter from '@/components/unit-converter/UnitConverter';
import ChemistryCalculator from '@/components/calculators/ChemistryCalculator';
import BiologyCalculator from '@/components/calculators/BiologyCalculator';
import { FlaskConical, Atom, TestTube } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Lab Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your everyday companion for chemistry and biology calculations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-lab-lightBlue flex items-center justify-center mb-4">
              <FlaskConical className="h-8 w-8 text-lab-blue" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Unit Conversions</h2>
            <p className="text-gray-600 mb-4">
              Easily convert between common laboratory units for mass, volume, temperature, and concentration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-lab-lightBlue flex items-center justify-center mb-4">
              <Atom className="h-8 w-8 text-lab-blue" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Chemistry Tools</h2>
            <p className="text-gray-600 mb-4">
              Calculate pH values, prepare solutions with precise dilutions, and work with gas laws.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-lab-lightBlue flex items-center justify-center mb-4">
              <TestTube className="h-8 w-8 text-lab-blue" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Biology Tools</h2>
            <p className="text-gray-600 mb-4">
              Get assistance with cell culture dilutions, protein concentration calculations, and PCR setup.
            </p>
          </div>
        </div>

        <Tabs defaultValue="unit-converter" className="space-y-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="unit-converter" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <span>Unit Converter</span>
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="flex items-center gap-2">
              <Atom className="h-4 w-4" />
              <span>Chemistry</span>
            </TabsTrigger>
            <TabsTrigger value="biology" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              <span>Biology</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unit-converter" className="mt-0">
            <UnitConverter />
          </TabsContent>

          <TabsContent value="chemistry" className="mt-0">
            <ChemistryCalculator />
          </TabsContent>

          <TabsContent value="biology" className="mt-0">
            <BiologyCalculator />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
