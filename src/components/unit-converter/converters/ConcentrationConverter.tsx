
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Molar mass of common elements and compounds for examples
const commonMolarMasses: Record<string, number> = {
  'NaCl': 58.44,
  'H2O': 18.02,
  'C6H12O6 (glucose)': 180.16,
  'NaOH': 40.00,
  'HCl': 36.46,
  'H2SO4': 98.08,
};

const ConcentrationConverter = () => {
  const [conversionType, setConversionType] = useState('molar-mass');
  const [molecularWeight, setMolecularWeight] = useState<number>(58.44); // Default to NaCl
  const [grams, setGrams] = useState<number | string>(1);
  const [moles, setMoles] = useState<number | string>('');
  const [volume, setVolume] = useState<number | string>(1);
  const [molarity, setMolarity] = useState<number | string>('');
  const [percentW, setPercentW] = useState<number | string>(1);
  const [massOfSolute, setMassOfSolute] = useState<number | string>(1);
  const [massOfSolution, setMassOfSolution] = useState<number | string>(100);
  const [error, setError] = useState('');

  // Calculate moles from grams and molecular weight
  useEffect(() => {
    if (conversionType === 'molar-mass') {
      if (typeof grams === 'number' && !isNaN(grams) && 
          typeof molecularWeight === 'number' && !isNaN(molecularWeight) && molecularWeight !== 0) {
        const calculatedMoles = grams / molecularWeight;
        setMoles(Number(calculatedMoles.toFixed(6)).toString());
        setError('');
      } else {
        setMoles('');
        setError('Please enter valid numbers');
      }
    }
  }, [grams, molecularWeight, conversionType]);

  // Calculate molarity from moles and volume
  useEffect(() => {
    if (conversionType === 'molarity') {
      if (typeof moles === 'number' && !isNaN(moles) && 
          typeof volume === 'number' && !isNaN(volume) && volume !== 0) {
        const calculatedMolarity = moles / volume;
        setMolarity(Number(calculatedMolarity.toFixed(6)).toString());
        setError('');
      } else {
        setMolarity('');
        setError('Please enter valid numbers');
      }
    }
  }, [moles, volume, conversionType]);

  // Calculate percent w/w from mass of solute and solution
  useEffect(() => {
    if (conversionType === 'percent-ww') {
      if (typeof massOfSolute === 'number' && !isNaN(massOfSolute) && 
          typeof massOfSolution === 'number' && !isNaN(massOfSolution) && massOfSolution !== 0) {
        const calculatedPercentW = (massOfSolute / massOfSolution) * 100;
        setPercentW(Number(calculatedPercentW.toFixed(4)).toString());
        setError('');
      } else {
        setPercentW('');
        setError('Please enter valid numbers');
      }
    }
  }, [massOfSolute, massOfSolution, conversionType]);

  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setGrams('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setGrams(numberValue);
      }
    }
  };

  const handleMolecularWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMolecularWeight(0);
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setMolecularWeight(numberValue);
      }
    }
  };

  const handleMolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMoles('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setMoles(numberValue);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setVolume('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setVolume(numberValue);
      }
    }
  };

  const handleMassOfSoluteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMassOfSolute('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setMassOfSolute(numberValue);
      }
    }
  };

  const handleMassOfSolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMassOfSolution('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setMassOfSolution(numberValue);
      }
    }
  };

  const handleSelectCompound = (value: string) => {
    setMolecularWeight(commonMolarMasses[value]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Concentration Conversions</h3>
        
        <div className="mb-6">
          <Select value={conversionType} onValueChange={setConversionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select conversion" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="molar-mass">Grams ↔ Moles (Molar Mass)</SelectItem>
                <SelectItem value="molarity">Moles/Volume (Molarity)</SelectItem>
                <SelectItem value="percent-ww">Percent Weight/Weight</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {conversionType === 'molar-mass' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="molecular-weight">Molecular Weight (g/mol)</Label>
                <div className="flex gap-3">
                  <div className="flex-grow">
                    <Input 
                      id="molecular-weight"
                      type="number"
                      value={molecularWeight}
                      onChange={handleMolecularWeightChange}
                      placeholder="Enter molecular weight"
                    />
                  </div>
                  <div className="w-40">
                    <Select onValueChange={handleSelectCompound}>
                      <SelectTrigger>
                        <SelectValue placeholder="Common" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(commonMolarMasses).map(compound => (
                            <SelectItem key={compound} value={compound}>
                              {compound}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="grams-value">Mass (g)</Label>
                  <Input 
                    id="grams-value"
                    type="number"
                    value={grams}
                    onChange={handleGramsChange}
                    placeholder="Enter grams"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moles-value">Moles (mol)</Label>
                  <Input 
                    id="moles-value"
                    value={moles}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Molar Mass Conversion:</h4>
              <p className="text-sm text-gray-600">
                moles = grams / molecular weight<br />
                grams = moles × molecular weight
              </p>
            </div>
          </div>
        )}

        {conversionType === 'molarity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="moles-input">Amount (mol)</Label>
                <Input 
                  id="moles-input"
                  type="number"
                  value={moles}
                  onChange={handleMolesChange}
                  placeholder="Enter moles"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volume-input">Volume (L)</Label>
                <Input 
                  id="volume-input"
                  type="number"
                  value={volume}
                  onChange={handleVolumeChange}
                  placeholder="Enter volume"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="molarity-output">Molarity (mol/L or M)</Label>
              <Input 
                id="molarity-output"
                value={molarity}
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Molarity Calculation:</h4>
              <p className="text-sm text-gray-600">
                Molarity (M) = moles of solute / volume of solution in liters<br />
                Common units: mol/L = M (molar)
              </p>
            </div>
          </div>
        )}
        
        {conversionType === 'percent-ww' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mass-solute">Mass of Solute (g)</Label>
                <Input 
                  id="mass-solute"
                  type="number"
                  value={massOfSolute}
                  onChange={handleMassOfSoluteChange}
                  placeholder="Enter mass of solute"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mass-solution">Mass of Solution (g)</Label>
                <Input 
                  id="mass-solution"
                  type="number"
                  value={massOfSolution}
                  onChange={handleMassOfSolutionChange}
                  placeholder="Enter mass of solution"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="percent-output">Percent Weight/Weight (%w/w)</Label>
              <div className="flex items-center">
                <Input 
                  id="percent-output"
                  value={percentW}
                  readOnly
                  className="bg-gray-50"
                />
                <span className="ml-2 text-lg">%</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Percent Weight/Weight Calculation:</h4>
              <p className="text-sm text-gray-600">
                % (w/w) = (mass of solute / mass of solution) × 100<br />
                Used for solid-solid and solid-liquid mixtures
              </p>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ConcentrationConverter;
