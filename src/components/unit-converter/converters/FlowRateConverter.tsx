
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Flow rate conversion factors (to m³/s)
const flowRateConversions: Record<string, number> = {
  'm³/s': 1, // cubic meter per second (base unit)
  'm³/min': 1 / 60, // cubic meter per minute
  'm³/h': 1 / 3600, // cubic meter per hour
  'L/s': 0.001, // liter per second
  'L/min': 0.001 / 60, // liter per minute
  'L/h': 0.001 / 3600, // liter per hour
  'cfm': 0.000471947, // cubic feet per minute
  'cfh': 0.000471947 / 60, // cubic feet per hour
  'gpm': 0.000063090, // US gallons per minute
  'gph': 0.000063090 / 60, // US gallons per hour
};

const FlowRateConverter = () => {
  const [fromUnit, setFromUnit] = useState('L/min');
  const [toUnit, setToUnit] = useState('cfm');
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromValue !== undefined && !isNaN(fromValue)) {
      // Convert from source unit to m³/s, then from m³/s to target unit
      const valueInCubicMeterPerSecond = fromValue * flowRateConversions[fromUnit];
      const convertedValue = valueInCubicMeterPerSecond / flowRateConversions[toUnit];
      
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
        <h3 className="text-lg font-medium mb-4">Flow Rate Conversion</h3>
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
                      <SelectItem value="m³/s">m³/s</SelectItem>
                      <SelectItem value="m³/min">m³/min</SelectItem>
                      <SelectItem value="m³/h">m³/h</SelectItem>
                      <SelectItem value="L/s">L/s</SelectItem>
                      <SelectItem value="L/min">L/min</SelectItem>
                      <SelectItem value="L/h">L/h</SelectItem>
                      <SelectItem value="cfm">CFM</SelectItem>
                      <SelectItem value="cfh">CFH</SelectItem>
                      <SelectItem value="gpm">GPM</SelectItem>
                      <SelectItem value="gph">GPH</SelectItem>
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
                      <SelectItem value="m³/s">m³/s</SelectItem>
                      <SelectItem value="m³/min">m³/min</SelectItem>
                      <SelectItem value="m³/h">m³/h</SelectItem>
                      <SelectItem value="L/s">L/s</SelectItem>
                      <SelectItem value="L/min">L/min</SelectItem>
                      <SelectItem value="L/h">L/h</SelectItem>
                      <SelectItem value="cfm">CFM</SelectItem>
                      <SelectItem value="cfh">CFH</SelectItem>
                      <SelectItem value="gpm">GPM</SelectItem>
                      <SelectItem value="gph">GPH</SelectItem>
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
        <h4 className="font-medium mb-2">Common Flow Rate Equivalents:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1 m³/s = 1000 L/s = 60000 L/min</li>
          <li>1 cfm ≈ 28.32 L/min ≈ 0.47 L/s</li>
          <li>1 L/min ≈ 0.0353 cfm</li>
          <li>1 gpm ≈ 3.78 L/min</li>
          <li>1 L/min ≈ 0.264 gpm</li>
        </ul>
      </div>
    </div>
  );
};

export default FlowRateConverter;
