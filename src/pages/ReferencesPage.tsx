
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Atom, FlaskConical, TestTube } from 'lucide-react';

const ReferencesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Lab References
          </h1>
          <p className="text-xl text-gray-600">
            Common references and formulas for laboratory work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader className="bg-lab-lightBlue">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-6 w-6 text-lab-blue" />
                <CardTitle>Common Solution Preparation</CardTitle>
              </div>
              <CardDescription>
                Reference guide for preparing common laboratory solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Buffers</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>PBS (Phosphate Buffered Saline), 1X:</strong>
                      <p>137 mM NaCl, 2.7 mM KCl, 10 mM Na₂HPO₄, 1.8 mM KH₂PO₄, pH 7.4</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>TAE Buffer (50X):</strong>
                      <p>2M Tris base, 1M Acetic acid, 50 mM EDTA, pH 8.3</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>TBE Buffer (5X):</strong>
                      <p>445 mM Tris base, 445 mM Boric acid, 10 mM EDTA, pH 8.3</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Tris-HCl (1M):</strong>
                      <p>121.1 g Tris base in 800 mL H₂O, adjust pH with HCl, bring to 1 L</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Stains and Dyes</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Coomassie Blue Staining Solution:</strong>
                      <p>0.1% Coomassie Brilliant Blue R-250, 40% methanol, 10% acetic acid</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Ethidium Bromide (10 mg/ml):</strong>
                      <p>1 g in 100 mL H₂O. Caution: Mutagen!</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Crystal Violet Solution (0.1%):</strong>
                      <p>0.1 g crystal violet, 20 mL 95% ethanol, 0.8 g ammonium oxalate, 80 mL H₂O</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-lab-lightBlue">
              <div className="flex items-center gap-2">
                <Atom className="h-6 w-6 text-lab-blue" />
                <CardTitle>Chemistry Reference</CardTitle>
              </div>
              <CardDescription>
                Common formulas and constants for chemistry
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Constants</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Avogadro's Number:</strong> 6.022 × 10²³ mol⁻¹
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Gas Constant (R):</strong> 8.314 J/(mol·K) or 0.08206 L·atm/(mol·K)
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Faraday Constant:</strong> 96,485 C/mol
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Standard Temperature and Pressure (STP):</strong> 273.15 K (0°C) and 1 atm
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Formulas</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Molarity:</strong> M = moles of solute / volume of solution (L)
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Molality:</strong> m = moles of solute / mass of solvent (kg)
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Weight Percent:</strong> w/w% = (mass of solute / mass of solution) × 100%
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Volume Percent:</strong> v/v% = (volume of solute / volume of solution) × 100%
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>pH:</strong> pH = -log[H⁺]
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Ideal Gas Law:</strong> PV = nRT
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-lab-lightBlue">
              <div className="flex items-center gap-2">
                <TestTube className="h-6 w-6 text-lab-blue" />
                <CardTitle>Biology Reference</CardTitle>
              </div>
              <CardDescription>
                Important biological values and conversions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">DNA and RNA</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Average Molecular Weight (dsDNA):</strong> 650 g/mol per base pair
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Average Molecular Weight (ssDNA):</strong> 325 g/mol per nucleotide
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Average Molecular Weight (RNA):</strong> 340 g/mol per nucleotide
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>DNA Concentration from Absorbance:</strong> 1 A₂₆₀ unit = 50 μg/mL dsDNA
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>RNA Concentration from Absorbance:</strong> 1 A₂₆₀ unit = 40 μg/mL RNA
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Protein</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Average Molecular Weight (protein):</strong> ~110 Da per amino acid
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Protein Concentration (Bradford):</strong> Measured at 595 nm
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Protein Concentration (BCA):</strong> Measured at 562 nm
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Protein Concentration (Direct UV):</strong> 1 A₂₈₀ unit ≈ 1 mg/mL (varies by protein)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-lab-lightBlue">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-6 w-6 text-lab-blue" />
                <CardTitle>Lab Safety Reference</CardTitle>
              </div>
              <CardDescription>
                Common safety guidelines and hazard information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Chemical Hazards</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>GHS Hazard Pictograms:</strong> Familiarize with all 9 pictograms (Explosive, Flammable, Oxidizer, etc.)
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Common Incompatible Chemicals:</strong>
                      <p>Acids and Bases, Oxidizers and Flammables, Acids and Cyanides</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Common Laboratory Carcinogens:</strong>
                      <p>Ethidium bromide, Formaldehyde, Benzene, Chromium compounds</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Emergency Procedures</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Chemical Spill:</strong> Contain small spills with appropriate spill kit; evacuate for large spills
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Chemical in Eye:</strong> Flush with eyewash for minimum 15 minutes
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Chemical on Skin:</strong> Rinse with water for minimum 15 minutes, remove contaminated clothing
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <strong>Fire:</strong> RACE procedure - Rescue, Alarm, Confine, Extinguish/Evacuate
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReferencesPage;
