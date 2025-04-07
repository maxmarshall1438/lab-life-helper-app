
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Pressure conversion factors (to Pascal)
const pressureConversions: Record<string, number> = {
  'Pa': 1, // pascal (base unit)
  'kPa': 1000, // kilopascal
  'MPa': 1000000, // megapascal
  'bar': 100000, // bar
  'mbar': 100, // millibar
  'atm': 101325, // standard atmosphere
  'psi': 6894.76, // pounds per square inch
  'Torr': 133.322, // Torr (mmHg)
  'mmHg': 133.322, // millimeters of mercury
  'inHg': 3386.39, // inches of mercury
  'cmH2O': 98.0665, // centimeters of water
  'inH2O': 249.089, // inches of water
};

const PressureConverter = () => {
  const [fromUnit, setFromUnit] = useState('mbar');
  const [toUnit, setToUnit] = useState('Torr');
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromValue !== undefined && !isNaN(fromValue)) {
      // Convert from source unit to pascal, then from pascal to target unit
      const valueInPascal = fromValue * pressureConversions[fromUnit];
      const convertedValue = valueInPascal / pressureConversions[toUnit];
      
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
          setToValue(Number(convertedValue.toFixed(6)).toString());
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
        <h3 className="text-lg font-medium mb-4">Pressure Conversion</h3>
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
                      <SelectItem value="Pa">Pa</SelectItem>
                      <SelectItem value="kPa">kPa</SelectItem>
                      <SelectItem value="MPa">MPa</SelectItem>
                      <SelectItem value="bar">bar</SelectItem>
                      <SelectItem value="mbar">mbar</SelectItem>
                      <SelectItem value="atm">atm</SelectItem>
                      <SelectItem value="psi">psi</SelectItem>
                      <SelectItem value="Torr">Torr</SelectItem>
                      <SelectItem value="mmHg">mmHg</SelectItem>
                      <SelectItem value="inHg">inHg</SelectItem>
                      <SelectItem value="cmH2O">cmH₂O</SelectItem>
                      <SelectItem value="inH2O">inH₂O</SelectItem>
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
                      <SelectItem value="Pa">Pa</SelectItem>
                      <SelectItem value="kPa">kPa</SelectItem>
                      <SelectItem value="MPa">MPa</SelectItem>
                      <SelectItem value="bar">bar</SelectItem>
                      <SelectItem value="mbar">mbar</SelectItem>
                      <SelectItem value="atm">atm</SelectItem>
                      <SelectItem value="psi">psi</SelectItem>
                      <SelectItem value="Torr">Torr</SelectItem>
                      <SelectItem value="mmHg">mmHg</SelectItem>
                      <SelectItem value="inHg">inHg</SelectItem>
                      <SelectItem value="cmH2O">cmH₂O</SelectItem>
                      <SelectItem value="inH2O">inH₂O</SelectItem>
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
        <h4 className="font-medium mb-2">Common Pressure Equivalents:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1 bar = 1000 mbar = 100 kPa</li>
          <li>1 atm = 1.01325 bar = 101325 Pa = 760 Torr</li>
          <li>1 psi = 6894.76 Pa = 51.715 Torr</li>
          <li>1 Torr = 1 mmHg = 133.322 Pa</li>
          <li>29.92 inHg = 1 atm (standard atmospheric pressure)</li>
        </ul>
      </div>
    </div>
  );
};

export default PressureConverter;
