
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CellCultureCalculator = () => {
  const [calculationType, setCalculationType] = useState('dilution');
  
  // Cell culture dilution variables
  const [currentDensity, setCurrentDensity] = useState<number>(1000000);
  const [targetDensity, setTargetDensity] = useState<number>(200000);
  const [finalVolume, setFinalVolume] = useState<number>(10);
  const [cellVolumeNeeded, setCellVolumeNeeded] = useState<string>('');
  const [mediumVolumeNeeded, setMediumVolumeNeeded] = useState<string>('');
  
  // Cell doubling time variables
  const [initialCount, setInitialCount] = useState<number>(100000);
  const [finalCount, setFinalCount] = useState<number>(800000);
  const [timeElapsed, setTimeElapsed] = useState<number>(48);
  const [timeUnit, setTimeUnit] = useState<string>('hours');
  const [doublingTime, setDoublingTime] = useState<string>('');
  
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (calculationType === 'dilution') {
      calculateCellDilution();
    } else if (calculationType === 'doubling') {
      calculateDoublingTime();
    }
  }, [
    calculationType, currentDensity, targetDensity, finalVolume, 
    initialCount, finalCount, timeElapsed, timeUnit
  ]);

  const calculateCellDilution = () => {
    try {
      if (currentDensity <= 0 || targetDensity <= 0 || finalVolume <= 0) {
        setError('All values must be positive');
        setCellVolumeNeeded('');
        setMediumVolumeNeeded('');
        return;
      }
      
      if (targetDensity > currentDensity) {
        setError('Target density cannot be higher than current density for dilution');
        setCellVolumeNeeded('');
        setMediumVolumeNeeded('');
        return;
      }
      
      const cellVolume = (targetDensity * finalVolume) / currentDensity;
      const mediumVolume = finalVolume - cellVolume;
      
      setCellVolumeNeeded(`${cellVolume.toFixed(2)} mL`);
      setMediumVolumeNeeded(`${mediumVolume.toFixed(2)} mL`);
      setError('');
    } catch (err) {
      setError('Calculation error');
    }
  };

  const calculateDoublingTime = () => {
    try {
      if (initialCount <= 0 || finalCount <= 0 || timeElapsed <= 0) {
        setError('All values must be positive');
        setDoublingTime('');
        return;
      }
      
      if (finalCount <= initialCount) {
        setError('Final count must be greater than initial count');
        setDoublingTime('');
        return;
      }
      
      // Calculate number of doublings: 2^n = final/initial => n = log2(final/initial)
      const growthRatio = finalCount / initialCount;
      const doublings = Math.log(growthRatio) / Math.log(2);
      
      // Calculate doubling time
      let time = timeElapsed / doublings;
      let unit = timeUnit;
      
      // Convert to appropriate units for better readability
      if (unit === 'hours' && time < 1) {
        time *= 60;
        unit = 'minutes';
      } else if (unit === 'hours' && time > 48) {
        time /= 24;
        unit = 'days';
      } else if (unit === 'minutes' && time > 120) {
        time /= 60;
        unit = 'hours';
      } else if (unit === 'days' && time < 0.5) {
        time *= 24;
        unit = 'hours';
      }
      
      setDoublingTime(`${time.toFixed(2)} ${unit}`);
      setError('');
    } catch (err) {
      setError('Calculation error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Cell Culture Calculator</h3>
        
        <RadioGroup
          value={calculationType}
          onValueChange={setCalculationType}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dilution" id="dilution" />
            <Label htmlFor="dilution">Cell Culture Dilution</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="doubling" id="doubling" />
            <Label htmlFor="doubling">Cell Doubling Time</Label>
          </div>
        </RadioGroup>
        
        {calculationType === 'dilution' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-density">Current Cell Density (cells/mL)</Label>
                <Input 
                  id="current-density"
                  type="number"
                  value={currentDensity}
                  onChange={(e) => setCurrentDensity(parseFloat(e.target.value) || 0)}
                  placeholder="Enter current density"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-density">Target Cell Density (cells/mL)</Label>
                <Input 
                  id="target-density"
                  type="number"
                  value={targetDensity}
                  onChange={(e) => setTargetDensity(parseFloat(e.target.value) || 0)}
                  placeholder="Enter target density"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="final-volume">Final Volume (mL)</Label>
                <Input 
                  id="final-volume"
                  type="number"
                  value={finalVolume}
                  onChange={(e) => setFinalVolume(parseFloat(e.target.value) || 0)}
                  placeholder="Enter final volume"
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="text-sm font-medium text-gray-500">Cell Suspension Needed:</div>
                <div className="text-xl font-semibold text-lab-blue mt-2">{cellVolumeNeeded}</div>
              </div>
              
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="text-sm font-medium text-gray-500">Fresh Medium Needed:</div>
                <div className="text-xl font-semibold text-lab-blue mt-2">{mediumVolumeNeeded}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Cell Dilution Formula:</h4>
              <p className="text-sm text-gray-600">
                <strong>Volume of cell suspension = (Target density × Final volume) / Current density</strong><br/>
                <strong>Volume of fresh medium = Final volume - Volume of cell suspension</strong>
              </p>
            </div>
          </div>
        )}
        
        {calculationType === 'doubling' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initial-count">Initial Cell Count (cells/mL)</Label>
                <Input 
                  id="initial-count"
                  type="number"
                  value={initialCount}
                  onChange={(e) => setInitialCount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter initial count"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="final-count">Final Cell Count (cells/mL)</Label>
                <Input 
                  id="final-count"
                  type="number"
                  value={finalCount}
                  onChange={(e) => setFinalCount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter final count"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="time-elapsed">Time Elapsed</Label>
                <Input 
                  id="time-elapsed"
                  type="number"
                  value={timeElapsed}
                  onChange={(e) => setTimeElapsed(parseFloat(e.target.value) || 0)}
                  placeholder="Enter time elapsed"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-unit">Unit</Label>
                <Select value={timeUnit} onValueChange={setTimeUnit}>
                  <SelectTrigger id="time-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">minutes</SelectItem>
                    <SelectItem value="hours">hours</SelectItem>
                    <SelectItem value="days">days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="p-4 border rounded-md bg-gray-50 mt-4">
              <div className="text-sm font-medium text-gray-500">Doubling Time:</div>
              <div className="text-xl font-semibold text-lab-blue mt-2">{doublingTime}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Doubling Time Formula:</h4>
              <p className="text-sm text-gray-600">
                <strong>Number of doublings = log<sub>2</sub>(Final count / Initial count)</strong><br/>
                <strong>Doubling time = Time elapsed / Number of doublings</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Common doubling times for mammalian cell cultures range from 18-24 hours. Bacterial cells can double much faster (20 minutes to a few hours).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CellCultureCalculator;
