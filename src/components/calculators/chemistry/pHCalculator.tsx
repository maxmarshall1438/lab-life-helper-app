
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const pHCalculator = () => {
  const [calculationType, setCalculationType] = useState('ph-from-h');
  const [concentration, setConcentration] = useState<number>(0.0001);
  const [pHValue, setPHValue] = useState<number | string>('');
  const [pOHValue, setPOHValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    calculate();
  }, [calculationType, concentration]);

  const calculate = () => {
    if (concentration < 0) {
      setError('Concentration cannot be negative');
      setPHValue('');
      setPOHValue('');
      return;
    }

    try {
      if (calculationType === 'ph-from-h') {
        if (concentration === 0) {
          setPHValue('∞');
          setPOHValue('0');
        } else {
          const pH = -Math.log10(concentration);
          const pOH = 14 - pH;
          setPHValue(Number(pH.toFixed(4)).toString());
          setPOHValue(Number(pOH.toFixed(4)).toString());
        }
      } else if (calculationType === 'poh-from-oh') {
        if (concentration === 0) {
          setPHValue('14');
          setPOHValue('∞');
        } else {
          const pOH = -Math.log10(concentration);
          const pH = 14 - pOH;
          setPHValue(Number(pH.toFixed(4)).toString());
          setPOHValue(Number(pOH.toFixed(4)).toString());
        }
      } else if (calculationType === 'h-from-ph') {
        if (concentration < 0 || concentration > 14) {
          setError('pH must be between 0 and 14');
          return;
        }
        const hConc = Math.pow(10, -concentration);
        const ohConc = Math.pow(10, -(14 - concentration));
        setPHValue(concentration.toString());
        setPOHValue(Number((14 - concentration).toFixed(4)).toString());
      } else if (calculationType === 'oh-from-poh') {
        if (concentration < 0 || concentration > 14) {
          setError('pOH must be between 0 and 14');
          return;
        }
        const ohConc = Math.pow(10, -concentration);
        const hConc = Math.pow(10, -(14 - concentration));
        setPHValue(Number((14 - concentration).toFixed(4)).toString());
        setPOHValue(concentration.toString());
      }
      setError('');
    } catch (err) {
      setError('Calculation error');
      setPHValue('');
      setPOHValue('');
    }
  };

  const handleConcentrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setConcentration(0);
    } else {
      try {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          setConcentration(numValue);
        }
      } catch (err) {
        setError('Invalid input');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">pH & pOH Calculator</h3>
        
        <div className="space-y-4">
          <RadioGroup
            value={calculationType}
            onValueChange={setCalculationType}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ph-from-h" id="ph-from-h" />
              <Label htmlFor="ph-from-h">Calculate pH from [H+]</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poh-from-oh" id="poh-from-oh" />
              <Label htmlFor="poh-from-oh">Calculate pOH from [OH-]</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h-from-ph" id="h-from-ph" />
              <Label htmlFor="h-from-ph">Enter pH to get [H+]</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oh-from-poh" id="oh-from-poh" />
              <Label htmlFor="oh-from-poh">Enter pOH to get [OH-]</Label>
            </div>
          </RadioGroup>
          
          <div className="pt-4">
            <Label htmlFor="concentration-input">
              {calculationType === 'ph-from-h' ? '[H+] concentration (mol/L)' : 
               calculationType === 'poh-from-oh' ? '[OH-] concentration (mol/L)' :
               calculationType === 'h-from-ph' ? 'pH value' : 'pOH value'}
            </Label>
            <div className="mt-2">
              <Input 
                id="concentration-input"
                type="number"
                value={concentration}
                onChange={handleConcentrationChange}
                placeholder="Enter value"
                step="any"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="text-sm font-medium text-gray-500">pH</div>
            <div className="text-2xl font-semibold text-lab-blue mt-2">{pHValue}</div>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="text-sm font-medium text-gray-500">pOH</div>
            <div className="text-2xl font-semibold text-lab-blue mt-2">{pOHValue}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium mb-2">pH & pOH Relationships:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>pH = -log<sub>10</sub>[H<sup>+</sup>]</li>
          <li>pOH = -log<sub>10</sub>[OH<sup>-</sup>]</li>
          <li>pH + pOH = 14 (at 25°C)</li>
          <li>[H<sup>+</sup>] = 10<sup>-pH</sup></li>
          <li>[OH<sup>-</sup>] = 10<sup>-pOH</sup></li>
          <li>Acidic: pH &lt; 7</li>
          <li>Neutral: pH = 7</li>
          <li>Basic: pH &gt; 7</li>
        </ul>
      </div>
    </div>
  );
};

export default pHCalculator;
