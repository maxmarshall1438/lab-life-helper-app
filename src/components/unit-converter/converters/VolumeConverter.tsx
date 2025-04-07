
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Volume conversion factors (to liters)
const volumeConversions: Record<string, number> = {
  'L': 1, // liter (base unit)
  'mL': 0.001, // milliliter
  'μL': 0.000001, // microliter
  'nL': 0.000000001, // nanoliter
  'gal': 3.78541, // gallon (US)
  'qt': 0.946353, // quart (US)
  'pt': 0.473176, // pint (US)
  'fl oz': 0.0295735, // fluid ounce (US)
  'm³': 1000, // cubic meter
  'cm³': 0.001, // cubic centimeter (same as mL)
};

const VolumeConverter = () => {
  const [fromUnit, setFromUnit] = useState('mL');
  const [toUnit, setToUnit] = useState('L');
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromValue !== undefined && !isNaN(fromValue)) {
      // Convert from source unit to liters, then from liters to target unit
      const valueInLiters = fromValue * volumeConversions[fromUnit];
      const convertedValue = valueInLiters / volumeConversions[toUnit];
      
      if (convertedValue === 0) {
        setToValue(0);
      } else if (!isFinite(convertedValue)) {
        setToValue('Error');
        setError('Calculation resulted in an invalid value.');
      } else {
        // Format based on size
        if (Math.abs(convertedValue) < 0.000001) {
          setToValue(convertedValue.toExponential(6));
        } else {
          setToValue(Number(convertedValue.toFixed(10)).toString());
        }
        setError('');
      }
    } else {
      setToValue('');
      setError('Please enter a valid number');
    }
  }, [fromValue, fromUnit, toUnit]);

  const handleFromUnitChange = (value: string) => {
    setFromUnit(value);
  };

  const handleToUnitChange = (value: string) => {
    setToUnit(value);
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setFromValue(0);
      setToValue('');
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setFromValue(numberValue);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Volume Conversion</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="from-value">From:</Label>
            <div className="flex gap-3">
              <div className="flex-grow">
                <Input 
                  id="from-value"
                  type="number"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  placeholder="Enter value"
                  className="w-full"
                />
              </div>
              <div className="w-24">
                <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="mL">mL</SelectItem>
                      <SelectItem value="μL">μL</SelectItem>
                      <SelectItem value="nL">nL</SelectItem>
                      <SelectItem value="gal">gal</SelectItem>
                      <SelectItem value="qt">qt</SelectItem>
                      <SelectItem value="pt">pt</SelectItem>
                      <SelectItem value="fl oz">fl oz</SelectItem>
                      <SelectItem value="m³">m³</SelectItem>
                      <SelectItem value="cm³">cm³</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="to-value">To:</Label>
            <div className="flex gap-3">
              <div className="flex-grow">
                <Input 
                  id="to-value"
                  value={toValue}
                  readOnly
                  className="w-full bg-gray-50"
                />
              </div>
              <div className="w-24">
                <Select value={toUnit} onValueChange={handleToUnitChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="mL">mL</SelectItem>
                      <SelectItem value="μL">μL</SelectItem>
                      <SelectItem value="nL">nL</SelectItem>
                      <SelectItem value="gal">gal</SelectItem>
                      <SelectItem value="qt">qt</SelectItem>
                      <SelectItem value="pt">pt</SelectItem>
                      <SelectItem value="fl oz">fl oz</SelectItem>
                      <SelectItem value="m³">m³</SelectItem>
                      <SelectItem value="cm³">cm³</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <div className="bg-gray-50 p-4 rounded-md mt-6">
        <h4 className="font-medium mb-2">Common Volume Equivalents:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1 L = 1000 mL</li>
          <li>1 mL = 1 cm³ = 1000 μL</li>
          <li>1 gal = 3.78541 L</li>
          <li>1 qt = 946.353 mL</li>
          <li>1 fl oz = 29.5735 mL</li>
        </ul>
      </div>
    </div>
  );
};

export default VolumeConverter;
