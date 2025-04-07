
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, FlaskConical } from 'lucide-react';

const MolarityCalculator = () => {
  const [mass, setMass] = useState<number>(1); // grams
  const [molarMass, setMolarMass] = useState<number>(58.44); // g/mol (NaCl as default example)
  const [volume, setVolume] = useState<number>(1); // liters
  const [molarity, setMolarity] = useState<number | string>('');
  
  const [activeTab, setActiveTab] = useState('calculate-molarity');
  
  // Calculate required mass
  const [targetMolarity, setTargetMolarity] = useState<number>(1); // mol/L
  const [targetMolarMass, setTargetMolarMass] = useState<number>(58.44); // g/mol
  const [targetVolume, setTargetVolume] = useState<number>(1); // liters
  const [requiredMass, setRequiredMass] = useState<number | string>('');

  // Calculate molarity from mass, molar mass, and volume
  useEffect(() => {
    if (mass !== undefined && molarMass !== undefined && volume !== undefined && 
        !isNaN(mass) && !isNaN(molarMass) && !isNaN(volume) && 
        molarMass > 0 && volume > 0) {
      // Molarity (M) = mass (g) / [molar mass (g/mol) × volume (L)]
      const calculatedMolarity = mass / (molarMass * volume);
      
      if (!isFinite(calculatedMolarity)) {
        setMolarity('Error');
      } else {
        setMolarity(Number(calculatedMolarity.toFixed(6)));
      }
    } else {
      setMolarity('');
    }
  }, [mass, molarMass, volume]);

  // Calculate required mass from molarity, molar mass, and volume
  useEffect(() => {
    if (targetMolarity !== undefined && targetMolarMass !== undefined && targetVolume !== undefined && 
        !isNaN(targetMolarity) && !isNaN(targetMolarMass) && !isNaN(targetVolume)) {
      // Mass (g) = molarity (M) × molar mass (g/mol) × volume (L)
      const calculatedMass = targetMolarity * targetMolarMass * targetVolume;
      
      if (!isFinite(calculatedMass)) {
        setRequiredMass('Error');
      } else {
        setRequiredMass(Number(calculatedMass.toFixed(4)));
      }
    } else {
      setRequiredMass('');
    }
  }, [targetMolarity, targetMolarMass, targetVolume]);

  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setMass(value);
    }
  };

  const handleMolarMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setMolarMass(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setVolume(value);
    }
  };

  const handleTargetMolarityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setTargetMolarity(value);
    }
  };

  const handleTargetMolarMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTargetMolarMass(value);
    }
  };

  const handleTargetVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTargetVolume(value);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-lab-lightBlue">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-lab-blue" />
          <CardTitle>Molarity Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate molarity or required mass for solution preparation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="calculate-molarity">Calculate Molarity</TabsTrigger>
            <TabsTrigger value="calculate-mass">Calculate Mass</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculate-molarity" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="solute-mass">Solute Mass (g):</Label>
                  <Input 
                    id="solute-mass"
                    type="number"
                    min="0"
                    step="0.01"
                    value={mass}
                    onChange={handleMassChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="molar-mass">Molar Mass (g/mol):</Label>
                  <Input 
                    id="molar-mass"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={molarMass}
                    onChange={handleMolarMassChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="volume">Volume (L):</Label>
                  <Input 
                    id="volume"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-center my-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="molarity">Molarity (mol/L or M):</Label>
                <Input 
                  id="molarity"
                  value={molarity}
                  readOnly
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calculate-mass" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="target-molarity">Desired Molarity (mol/L):</Label>
                  <Input 
                    id="target-molarity"
                    type="number"
                    min="0"
                    step="0.01"
                    value={targetMolarity}
                    onChange={handleTargetMolarityChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="target-molar-mass">Molar Mass (g/mol):</Label>
                  <Input 
                    id="target-molar-mass"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={targetMolarMass}
                    onChange={handleTargetMolarMassChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="target-volume">Solution Volume (L):</Label>
                  <Input 
                    id="target-volume"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={targetVolume}
                    onChange={handleTargetVolumeChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-center my-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <ArrowDown className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="required-mass">Required Mass (g):</Label>
                <Input 
                  id="required-mass"
                  value={requiredMass}
                  readOnly
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h4 className="font-medium mb-2">Equations and Notes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Molarity (M) = moles of solute / volume of solution in liters</li>
            <li>Moles of solute = mass of solute (g) / molar mass (g/mol)</li>
            <li>Required mass (g) = molarity (M) × molar mass (g/mol) × volume (L)</li>
            <li>Example: For 1M NaCl, with molar mass 58.44 g/mol, you need 58.44g per liter</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MolarityCalculator;
