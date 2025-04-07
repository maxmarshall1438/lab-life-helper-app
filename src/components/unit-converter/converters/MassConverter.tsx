
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Mass conversion factors (to grams)
const massConversions: Record<string, number> = {
  'g': 1, // gram (base unit)
  'kg': 1000, // kilogram
  'mg': 0.001, // milligram
  'μg': 0.000001, // microgram
  'ng': 0.000000001, // nanogram
  'pg': 0.000000000001, // picogram
  'lb': 453.59237, // pound
  'oz': 28.3495231, // ounce
};

const MassConverter = () => {
  const [fromUnit, setFromUnit] = useState('g');
  const [toUnit, setToUnit] = useState('mg');
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromValue !== undefined && !isNaN(fromValue)) {
      // Convert from source unit to grams, then from grams to target unit
      const valueInGrams = fromValue * massConversions[fromUnit];
      const convertedValue = valueInGrams / massConversions[toUnit];
      
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
        <h3 className="text-lg font-medium mb-4">Mass Conversion</h3>
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
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="mg">mg</SelectItem>
                      <SelectItem value="μg">μg</SelectItem>
                      <SelectItem value="ng">ng</SelectItem>
                      <SelectItem value="pg">pg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
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
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="mg">mg</SelectItem>
                      <SelectItem value="μg">μg</SelectItem>
                      <SelectItem value="ng">ng</SelectItem>
                      <SelectItem value="pg">pg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
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
        <h4 className="font-medium mb-2">Common Mass Equivalents:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1 kg = 1000 g</li>
          <li>1 g = 1000 mg</li>
          <li>1 mg = 1000 μg</li>
          <li>1 lb = 453.59237 g</li>
          <li>1 oz = 28.3495 g</li>
        </ul>
      </div>
    </div>
  );
};

export default MassConverter;
