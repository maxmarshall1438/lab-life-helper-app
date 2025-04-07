
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, Atom } from 'lucide-react';

const CentrifugeCalculator = () => {
  // RPM to RCF conversion
  const [rotorRadius, setRotorRadius] = useState<number>(10);
  const [rpm, setRpm] = useState<number>(1000);
  const [rcf, setRcf] = useState<number | string>('');
  // RCF to RPM conversion
  const [rotorRadius2, setRotorRadius2] = useState<number>(10);
  const [rcf2, setRcf2] = useState<number>(100);
  const [rpm2, setRpm2] = useState<number | string>('');
  
  const [activeTab, setActiveTab] = useState('rpm-to-rcf');

  // Calculate RCF from RPM and rotor radius
  useEffect(() => {
    if (rpm !== undefined && rotorRadius !== undefined && !isNaN(rpm) && !isNaN(rotorRadius)) {
      // RCF = 1.118 × 10^-5 × radius(cm) × RPM²
      const calculatedRcf = 1.118e-5 * rotorRadius * rpm * rpm;
      
      if (!isFinite(calculatedRcf)) {
        setRcf('Error');
      } else {
        setRcf(Number(calculatedRcf.toFixed(2)));
      }
    } else {
      setRcf('');
    }
  }, [rpm, rotorRadius]);

  // Calculate RPM from RCF and rotor radius
  useEffect(() => {
    if (rcf2 !== undefined && rotorRadius2 !== undefined && !isNaN(rcf2) && !isNaN(rotorRadius2) && rotorRadius2 > 0) {
      // RPM = sqrt(RCF / (1.118 × 10^-5 × radius(cm)))
      const calculatedRpm = Math.sqrt(rcf2 / (1.118e-5 * rotorRadius2));
      
      if (!isFinite(calculatedRpm)) {
        setRpm2('Error');
      } else {
        setRpm2(Number(calculatedRpm.toFixed(0)));
      }
    } else {
      setRpm2('');
    }
  }, [rcf2, rotorRadius2]);

  const handleRotorRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRotorRadius(value);
    }
  };

  const handleRpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setRpm(value);
    }
  };

  const handleRotorRadius2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRotorRadius2(value);
    }
  };

  const handleRcf2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setRcf2(value);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-lab-lightBlue">
        <div className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-lab-blue" />
          <CardTitle>Centrifuge Calculator</CardTitle>
        </div>
        <CardDescription>
          Convert between RPM and RCF (g-force) for centrifugation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="rpm-to-rcf">RPM to RCF</TabsTrigger>
            <TabsTrigger value="rcf-to-rpm">RCF to RPM</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rpm-to-rcf" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="rotor-radius">Rotor Radius (cm):</Label>
                  <Input 
                    id="rotor-radius"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={rotorRadius}
                    onChange={handleRotorRadiusChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="rpm">Speed (RPM):</Label>
                  <Input 
                    id="rpm"
                    type="number"
                    min="0"
                    step="100"
                    value={rpm}
                    onChange={handleRpmChange}
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
                <Label htmlFor="rcf">Relative Centrifugal Force (RCF) in × g:</Label>
                <Input 
                  id="rcf"
                  value={rcf}
                  readOnly
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rcf-to-rpm" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="rotor-radius-2">Rotor Radius (cm):</Label>
                  <Input 
                    id="rotor-radius-2"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={rotorRadius2}
                    onChange={handleRotorRadius2Change}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="rcf-2">RCF (× g):</Label>
                  <Input 
                    id="rcf-2"
                    type="number"
                    min="0"
                    step="10"
                    value={rcf2}
                    onChange={handleRcf2Change}
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
                <Label htmlFor="rpm-2">Speed (RPM):</Label>
                <Input 
                  id="rpm-2"
                  value={rpm2}
                  readOnly
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h4 className="font-medium mb-2">Equations:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>RCF = 1.118 × 10⁻⁵ × radius (cm) × RPM²</li>
            <li>RPM = √(RCF / (1.118 × 10⁻⁵ × radius))</li>
            <li>RCF is the relative centrifugal force in units of gravity (g)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CentrifugeCalculator;
