
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DilutionCalculator = () => {
  const [calculationType, setCalculationType] = useState('find-v2');
  const [c1, setC1] = useState<number>(1);
  const [v1, setV1] = useState<number>(10);
  const [c2, setC2] = useState<number>(0.1);
  const [v2, setV2] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    calculate();
  }, [calculationType, c1, v1, c2, v2]);

  const calculate = () => {
    setError('');
    
    if (c1 <= 0 || v1 <= 0) {
      setError('Initial concentration and volume must be positive');
      return;
    }

    try {
      if (calculationType === 'find-v2') {
        if (c2 <= 0) {
          setError('Final concentration must be positive');
          return;
        }
        if (c2 >= c1) {
          setError('Final concentration must be less than initial concentration for dilution');
          return;
        }
        const calculatedV2 = (c1 * v1) / c2;
        setV2(Number(calculatedV2.toFixed(4)).toString());
      } else if (calculationType === 'find-c2') {
        if (Number(v2) <= 0) {
          setError('Final volume must be positive');
          return;
        }
        if (Number(v2) <= v1) {
          setError('Final volume must be greater than initial volume for dilution');
          return;
        }
        const calculatedC2 = (c1 * v1) / Number(v2);
        setC2(Number(calculatedC2.toFixed(6)));
      }
    } catch (err) {
      setError('Calculation error');
    }
  };

  const handleC1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setC1(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setC1(numValue);
      }
    }
  };

  const handleV1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setV1(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setV1(numValue);
      }
    }
  };

  const handleC2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setC2(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setC2(numValue);
      }
    }
  };

  const handleV2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setV2('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setV2(numValue);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Dilution Calculator (C₁V₁ = C₂V₂)</h3>
        
        <RadioGroup
          value={calculationType}
          onValueChange={setCalculationType}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="find-v2" id="find-v2" />
            <Label htmlFor="find-v2">Find Final Volume (V₂)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="find-c2" id="find-c2" />
            <Label htmlFor="find-c2">Find Final Concentration (C₂)</Label>
          </div>
        </RadioGroup>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c1-input">Initial Concentration (C₁) [mol/L]</Label>
              <Input 
                id="c1-input"
                type="number"
                value={c1}
                onChange={handleC1Change}
                placeholder="Enter initial concentration"
                step="any"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="v1-input">Initial Volume (V₁) [mL]</Label>
              <Input 
                id="v1-input"
                type="number"
                value={v1}
                onChange={handleV1Change}
                placeholder="Enter initial volume"
                step="any"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c2-input">Final Concentration (C₂) [mol/L]</Label>
              <Input 
                id="c2-input"
                type="number"
                value={c2}
                onChange={handleC2Change}
                placeholder="Enter final concentration"
                step="any"
                disabled={calculationType === 'find-c2'}
                className={calculationType === 'find-c2' ? 'bg-gray-50' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="v2-input">Final Volume (V₂) [mL]</Label>
              <Input 
                id="v2-input"
                type="number"
                value={v2}
                onChange={handleV2Change}
                placeholder="Enter final volume"
                step="any"
                disabled={calculationType === 'find-v2'}
                className={calculationType === 'find-v2' ? 'bg-gray-50' : ''}
              />
            </div>
          </div>
        </div>
        
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h4 className="font-medium mb-2">How to use:</h4>
          <p className="text-sm text-gray-600 mb-2">
            This calculator uses the dilution equation: C₁V₁ = C₂V₂
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• C₁: Initial concentration (concentration of stock solution)</li>
            <li>• V₁: Initial volume (volume of stock solution to use)</li>
            <li>• C₂: Final concentration (desired diluted concentration)</li>
            <li>• V₂: Final volume (total volume after dilution)</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 border-l-4 border-lab-blue bg-lab-lightBlue rounded-r-md">
          <p className="text-sm">
            <span className="font-medium">Amount to add:</span> For a dilution from {c1} M to {c2} M, 
            take {calculationType === 'find-v2' ? v1 : v1} mL of stock solution and 
            add {calculationType === 'find-v2' 
              ? `enough solvent to make ${v2} mL final volume (add ${(Number(v2) - v1).toFixed(2)} mL solvent)` 
              : `${(Number(v2) - v1).toFixed(2)} mL solvent to make ${v2} mL final volume`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DilutionCalculator;
