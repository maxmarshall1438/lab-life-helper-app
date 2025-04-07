
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const TemperatureConverter = () => {
  const [fromUnit, setFromUnit] = useState('C');
  const [toUnit, setToUnit] = useState('F');
  const [fromValue, setFromValue] = useState<number>(25);
  const [toValue, setToValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromValue !== undefined && !isNaN(fromValue)) {
      let convertedValue: number;

      if (fromUnit === toUnit) {
        convertedValue = fromValue;
      } else if (fromUnit === 'C' && toUnit === 'F') {
        // Celsius to Fahrenheit
        convertedValue = (fromValue * 9/5) + 32;
      } else if (fromUnit === 'C' && toUnit === 'K') {
        // Celsius to Kelvin
        convertedValue = fromValue + 273.15;
      } else if (fromUnit === 'F' && toUnit === 'C') {
        // Fahrenheit to Celsius
        convertedValue = (fromValue - 32) * 5/9;
      } else if (fromUnit === 'F' && toUnit === 'K') {
        // Fahrenheit to Kelvin
        convertedValue = (fromValue - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'K' && toUnit === 'C') {
        // Kelvin to Celsius
        convertedValue = fromValue - 273.15;
      } else if (fromUnit === 'K' && toUnit === 'F') {
        // Kelvin to Fahrenheit
        convertedValue = (fromValue - 273.15) * 9/5 + 32;
      } else {
        convertedValue = 0;
      }

      if (!isFinite(convertedValue)) {
        setToValue('Error');
        setError('Calculation resulted in an invalid value.');
      } else {
        setToValue(Number(convertedValue.toFixed(6)).toString());
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
        <h3 className="text-lg font-medium mb-4">Temperature Conversion</h3>
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
                      <SelectItem value="C">°C</SelectItem>
                      <SelectItem value="F">°F</SelectItem>
                      <SelectItem value="K">K</SelectItem>
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
                      <SelectItem value="C">°C</SelectItem>
                      <SelectItem value="F">°F</SelectItem>
                      <SelectItem value="K">K</SelectItem>
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
        <h4 className="font-medium mb-2">Temperature Conversion Formulas:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Celsius to Fahrenheit: °F = (°C × 9/5) + 32</li>
          <li>Fahrenheit to Celsius: °C = (°F - 32) × 5/9</li>
          <li>Celsius to Kelvin: K = °C + 273.15</li>
          <li>Kelvin to Celsius: °C = K - 273.15</li>
          <li>Common references: 0°C = 32°F = 273.15K (water freezing point)</li>
          <li>Common references: 100°C = 212°F = 373.15K (water boiling point)</li>
        </ul>
      </div>
    </div>
  );
};

export default TemperatureConverter;
