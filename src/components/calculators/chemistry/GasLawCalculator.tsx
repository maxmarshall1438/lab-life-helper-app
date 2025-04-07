
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Gas constant R in different units
const R_CONSTANTS = {
  'L·atm/(mol·K)': 0.08206,
  'J/(mol·K)': 8.3145,
  'kPa·L/(mol·K)': 8.3145,
  'mmHg·L/(mol·K)': 62.364
};

const GasLawCalculator = () => {
  const [gasLaw, setGasLaw] = useState('ideal');
  
  // Ideal Gas Law variables
  const [pressure, setPressure] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [moles, setMoles] = useState<number>(1);
  const [temperature, setTemperature] = useState<number>(273.15);
  const [pressureUnit, setPressureUnit] = useState<string>('atm');
  const [volumeUnit, setVolumeUnit] = useState<string>('L');
  const [temperatureUnit, setTemperatureUnit] = useState<string>('K');
  const [unknownVariable, setUnknownVariable] = useState<string>('pressure');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Combined Gas Law variables
  const [initialPressure, setInitialPressure] = useState<number>(1);
  const [initialVolume, setInitialVolume] = useState<number>(1);
  const [initialTemperature, setInitialTemperature] = useState<number>(273.15);
  const [finalPressure, setFinalPressure] = useState<number>(2);
  const [finalVolume, setFinalVolume] = useState<number>(0.5);
  const [finalTemperature, setFinalTemperature] = useState<number>(293.15);
  const [combinedUnknown, setCombinedUnknown] = useState<string>('P2');
  const [combinedResult, setCombinedResult] = useState<string>('');
  const [combinedError, setCombinedError] = useState<string>('');

  useEffect(() => {
    if (gasLaw === 'ideal') {
      calculateIdealGasLaw();
    } else {
      calculateCombinedGasLaw();
    }
  }, [
    gasLaw, pressure, volume, moles, temperature, pressureUnit, volumeUnit, 
    temperatureUnit, unknownVariable, initialPressure, initialVolume, initialTemperature,
    finalPressure, finalVolume, finalTemperature, combinedUnknown
  ]);

  // Convert temperature to Kelvin for calculations
  const convertToKelvin = (value: number, unit: string): number => {
    if (unit === 'K') return value;
    if (unit === '°C') return value + 273.15;
    if (unit === '°F') return (value - 32) * 5/9 + 273.15;
    return value;
  };

  // Convert pressure to atm for calculations
  const convertToAtm = (value: number, unit: string): number => {
    if (unit === 'atm') return value;
    if (unit === 'kPa') return value / 101.325;
    if (unit === 'mmHg') return value / 760;
    if (unit === 'bar') return value / 1.01325;
    if (unit === 'psi') return value / 14.696;
    return value;
  };

  // Convert volume to liters for calculations
  const convertToLiters = (value: number, unit: string): number => {
    if (unit === 'L') return value;
    if (unit === 'mL') return value / 1000;
    if (unit === 'cm³') return value / 1000;
    if (unit === 'm³') return value * 1000;
    return value;
  };

  const calculateIdealGasLaw = () => {
    try {
      // Convert to standard units for calculation
      const P_atm = convertToAtm(pressure, pressureUnit);
      const V_L = convertToLiters(volume, volumeUnit);
      const n = moles;
      const T_K = convertToKelvin(temperature, temperatureUnit);
      const R = R_CONSTANTS['L·atm/(mol·K)']; // 0.08206 L·atm/(mol·K)
      
      // Check that values are positive
      if (P_atm <= 0 || V_L <= 0 || n <= 0 || T_K <= 0) {
        setError('All values must be positive');
        return;
      }

      if (unknownVariable === 'pressure') {
        const P = (n * R * T_K) / V_L;
        setResult(`P = ${P.toFixed(6)} atm`);
      } else if (unknownVariable === 'volume') {
        const V = (n * R * T_K) / P_atm;
        setResult(`V = ${V.toFixed(6)} L`);
      } else if (unknownVariable === 'moles') {
        const n = (P_atm * V_L) / (R * T_K);
        setResult(`n = ${n.toFixed(6)} mol`);
      } else if (unknownVariable === 'temperature') {
        const T = (P_atm * V_L) / (n * R);
        setResult(`T = ${T.toFixed(6)} K (${(T - 273.15).toFixed(2)} °C)`);
      }
      setError('');
    } catch (err) {
      setError('Calculation error');
    }
  };

  const calculateCombinedGasLaw = () => {
    try {
      // Convert to standard units
      const P1_atm = convertToAtm(initialPressure, 'atm');
      const V1_L = convertToLiters(initialVolume, 'L');
      const T1_K = convertToKelvin(initialTemperature, 'K');
      const P2_atm = convertToAtm(finalPressure, 'atm');
      const V2_L = convertToLiters(finalVolume, 'L');
      const T2_K = convertToKelvin(finalTemperature, 'K');
      
      // Check for positive values
      if (P1_atm <= 0 || V1_L <= 0 || T1_K <= 0) {
        setCombinedError('Initial values must be positive');
        return;
      }

      // Combined Gas Law: P1*V1/T1 = P2*V2/T2
      if (combinedUnknown === 'P2') {
        const P2 = (P1_atm * V1_L * T2_K) / (V2_L * T1_K);
        setCombinedResult(`P₂ = ${P2.toFixed(6)} atm`);
      } else if (combinedUnknown === 'V2') {
        const V2 = (P1_atm * V1_L * T2_K) / (P2_atm * T1_K);
        setCombinedResult(`V₂ = ${V2.toFixed(6)} L`);
      } else if (combinedUnknown === 'T2') {
        const T2 = (P2_atm * V2_L * T1_K) / (P1_atm * V1_L);
        setCombinedResult(`T₂ = ${T2.toFixed(6)} K (${(T2 - 273.15).toFixed(2)} °C)`);
      } else if (combinedUnknown === 'P1') {
        const P1 = (P2_atm * V2_L * T1_K) / (V1_L * T2_K);
        setCombinedResult(`P₁ = ${P1.toFixed(6)} atm`);
      } else if (combinedUnknown === 'V1') {
        const V1 = (P2_atm * V2_L * T1_K) / (P1_atm * T2_K);
        setCombinedResult(`V₁ = ${V1.toFixed(6)} L`);
      } else if (combinedUnknown === 'T1') {
        const T1 = (P1_atm * V1_L * T2_K) / (P2_atm * V2_L);
        setCombinedResult(`T₁ = ${T1.toFixed(6)} K (${(T1 - 273.15).toFixed(2)} °C)`);
      }
      setCombinedError('');
    } catch (err) {
      setCombinedError('Calculation error');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ideal" value={gasLaw} onValueChange={setGasLaw} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="ideal">Ideal Gas Law</TabsTrigger>
          <TabsTrigger value="combined">Combined Gas Law</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ideal">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Ideal Gas Law (PV = nRT)</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Solve for:</Label>
                <Select
                  value={unknownVariable}
                  onValueChange={setUnknownVariable}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Unknown variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pressure">Pressure (P)</SelectItem>
                    <SelectItem value="volume">Volume (V)</SelectItem>
                    <SelectItem value="moles">Number of moles (n)</SelectItem>
                    <SelectItem value="temperature">Temperature (T)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {unknownVariable !== 'pressure' && (
                <div className="space-y-2">
                  <Label htmlFor="pressure-input">Pressure (P)</Label>
                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <Input 
                        id="pressure-input"
                        type="number"
                        value={pressure}
                        onChange={(e) => setPressure(parseFloat(e.target.value) || 0)}
                        placeholder="Enter pressure"
                        step="any"
                      />
                    </div>
                    <div className="w-24">
                      <Select value={pressureUnit} onValueChange={setPressureUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atm">atm</SelectItem>
                          <SelectItem value="mmHg">mmHg</SelectItem>
                          <SelectItem value="kPa">kPa</SelectItem>
                          <SelectItem value="bar">bar</SelectItem>
                          <SelectItem value="psi">psi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {unknownVariable !== 'volume' && (
                <div className="space-y-2">
                  <Label htmlFor="volume-input">Volume (V)</Label>
                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <Input 
                        id="volume-input"
                        type="number"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
                        placeholder="Enter volume"
                        step="any"
                      />
                    </div>
                    <div className="w-24">
                      <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="mL">mL</SelectItem>
                          <SelectItem value="cm³">cm³</SelectItem>
                          <SelectItem value="m³">m³</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {unknownVariable !== 'moles' && (
                <div className="space-y-2">
                  <Label htmlFor="moles-input">Number of moles (n)</Label>
                  <Input 
                    id="moles-input"
                    type="number"
                    value={moles}
                    onChange={(e) => setMoles(parseFloat(e.target.value) || 0)}
                    placeholder="Enter number of moles"
                    step="any"
                  />
                </div>
              )}
              
              {unknownVariable !== 'temperature' && (
                <div className="space-y-2">
                  <Label htmlFor="temperature-input">Temperature (T)</Label>
                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <Input 
                        id="temperature-input"
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                        placeholder="Enter temperature"
                        step="any"
                      />
                    </div>
                    <div className="w-24">
                      <Select value={temperatureUnit} onValueChange={setTemperatureUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="K">K</SelectItem>
                          <SelectItem value="°C">°C</SelectItem>
                          <SelectItem value="°F">°F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="p-4 border rounded-md bg-gray-50 mt-6">
              <div className="text-sm font-medium text-gray-500">Result:</div>
              <div className="text-xl font-semibold text-lab-blue mt-2">{result}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Ideal Gas Law:</h4>
              <p className="text-sm text-gray-600 mb-2">
                PV = nRT where:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• P: Pressure (atm)</li>
                <li>• V: Volume (L)</li>
                <li>• n: Number of moles (mol)</li>
                <li>• R: Gas constant (0.08206 L·atm/(mol·K))</li>
                <li>• T: Temperature (K)</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="combined">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Combined Gas Law (P₁V₁/T₁ = P₂V₂/T₂)</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Solve for:</Label>
                <Select
                  value={combinedUnknown}
                  onValueChange={setCombinedUnknown}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Unknown variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P2">Final Pressure (P₂)</SelectItem>
                    <SelectItem value="V2">Final Volume (V₂)</SelectItem>
                    <SelectItem value="T2">Final Temperature (T₂)</SelectItem>
                    <SelectItem value="P1">Initial Pressure (P₁)</SelectItem>
                    <SelectItem value="V1">Initial Volume (V₁)</SelectItem>
                    <SelectItem value="T1">Initial Temperature (T₁)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Initial Conditions:</h4>
                  
                  {combinedUnknown !== 'P1' && (
                    <div className="space-y-2">
                      <Label htmlFor="initial-pressure">Initial Pressure (P₁) [atm]</Label>
                      <Input 
                        id="initial-pressure"
                        type="number"
                        value={initialPressure}
                        onChange={(e) => setInitialPressure(parseFloat(e.target.value) || 0)}
                        placeholder="Enter initial pressure"
                        step="any"
                      />
                    </div>
                  )}
                  
                  {combinedUnknown !== 'V1' && (
                    <div className="space-y-2">
                      <Label htmlFor="initial-volume">Initial Volume (V₁) [L]</Label>
                      <Input 
                        id="initial-volume"
                        type="number"
                        value={initialVolume}
                        onChange={(e) => setInitialVolume(parseFloat(e.target.value) || 0)}
                        placeholder="Enter initial volume"
                        step="any"
                      />
                    </div>
                  )}
                  
                  {combinedUnknown !== 'T1' && (
                    <div className="space-y-2">
                      <Label htmlFor="initial-temperature">Initial Temperature (T₁) [K]</Label>
                      <Input 
                        id="initial-temperature"
                        type="number"
                        value={initialTemperature}
                        onChange={(e) => setInitialTemperature(parseFloat(e.target.value) || 0)}
                        placeholder="Enter initial temperature"
                        step="any"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Final Conditions:</h4>
                  
                  {combinedUnknown !== 'P2' && (
                    <div className="space-y-2">
                      <Label htmlFor="final-pressure">Final Pressure (P₂) [atm]</Label>
                      <Input 
                        id="final-pressure"
                        type="number"
                        value={finalPressure}
                        onChange={(e) => setFinalPressure(parseFloat(e.target.value) || 0)}
                        placeholder="Enter final pressure"
                        step="any"
                      />
                    </div>
                  )}
                  
                  {combinedUnknown !== 'V2' && (
                    <div className="space-y-2">
                      <Label htmlFor="final-volume">Final Volume (V₂) [L]</Label>
                      <Input 
                        id="final-volume"
                        type="number"
                        value={finalVolume}
                        onChange={(e) => setFinalVolume(parseFloat(e.target.value) || 0)}
                        placeholder="Enter final volume"
                        step="any"
                      />
                    </div>
                  )}
                  
                  {combinedUnknown !== 'T2' && (
                    <div className="space-y-2">
                      <Label htmlFor="final-temperature">Final Temperature (T₂) [K]</Label>
                      <Input 
                        id="final-temperature"
                        type="number"
                        value={finalTemperature}
                        onChange={(e) => setFinalTemperature(parseFloat(e.target.value) || 0)}
                        placeholder="Enter final temperature"
                        step="any"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {combinedError && <p className="text-sm text-red-500">{combinedError}</p>}
            
            <div className="p-4 border rounded-md bg-gray-50 mt-6">
              <div className="text-sm font-medium text-gray-500">Result:</div>
              <div className="text-xl font-semibold text-lab-blue mt-2">{combinedResult}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Combined Gas Law:</h4>
              <p className="text-sm text-gray-600">
                P₁V₁/T₁ = P₂V₂/T₂
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This law combines Boyle's Law (PV = constant at constant T) and Charles' Law (V/T = constant at constant P)
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GasLawCalculator;
