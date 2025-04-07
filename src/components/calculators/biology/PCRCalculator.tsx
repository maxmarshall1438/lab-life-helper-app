
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PCRCalculator = () => {
  const [dnaConcentration, setDNAConcentration] = useState<number>(100); // ng/μL
  const [dnaLength, setDNALength] = useState<number>(1000); // bp
  const [targetAmount, setTargetAmount] = useState<number>(50); // ng
  const [concentrationUnit, setConcentrationUnit] = useState<string>('ng/μL');
  
  const [volumeNeeded, setVolumeNeeded] = useState<string>('');
  const [molarity, setMolarity] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    calculatePCR();
  }, [dnaConcentration, dnaLength, targetAmount, concentrationUnit]);

  const calculatePCR = () => {
    try {
      if (dnaConcentration <= 0 || dnaLength <= 0 || targetAmount <= 0) {
        setError('All values must be positive');
        setVolumeNeeded('');
        setMolarity('');
        return;
      }
      
      // Convert concentration to ng/μL if necessary
      let concInNgPerUL = dnaConcentration;
      if (concentrationUnit === 'μg/mL') {
        concInNgPerUL = dnaConcentration;
      } else if (concentrationUnit === 'μg/μL') {
        concInNgPerUL = dnaConcentration * 1000;
      }
      
      // Calculate volume needed
      const volume = targetAmount / concInNgPerUL;
      setVolumeNeeded(`${volume.toFixed(2)} μL`);
      
      // Calculate molarity
      // 1 bp of dsDNA = 650 g/mol
      // M = g/L / molecular weight
      const molecularWeight = dnaLength * 650; // g/mol
      const gramsPerLiter = concInNgPerUL * 1e-6; // ng/μL -> g/L
      
      const molarityInMoles = gramsPerLiter / molecularWeight; // mol/L
      
      let molarityStr = '';
      if (molarityInMoles < 1e-9) {
        molarityStr = `${(molarityInMoles * 1e12).toFixed(2)} pM`;
      } else if (molarityInMoles < 1e-6) {
        molarityStr = `${(molarityInMoles * 1e9).toFixed(2)} nM`;
      } else if (molarityInMoles < 1e-3) {
        molarityStr = `${(molarityInMoles * 1e6).toFixed(2)} μM`;
      } else {
        molarityStr = `${(molarityInMoles * 1e3).toFixed(2)} mM`;
      }
      
      setMolarity(molarityStr);
      setError('');
    } catch (err) {
      setError('Calculation error');
      setVolumeNeeded('');
      setMolarity('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">PCR & DNA Calculator</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4 items-end">
            <div className="flex-grow space-y-2">
              <Label htmlFor="dna-concentration">DNA Concentration</Label>
              <Input 
                id="dna-concentration"
                type="number"
                value={dnaConcentration}
                onChange={(e) => setDNAConcentration(parseFloat(e.target.value) || 0)}
                placeholder="Enter DNA concentration"
                step="any"
              />
            </div>
            
            <div className="w-32">
              <Select value={concentrationUnit} onValueChange={setConcentrationUnit}>
                <SelectTrigger id="concentration-unit">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ng/μL">ng/μL</SelectItem>
                  <SelectItem value="μg/mL">μg/mL</SelectItem>
                  <SelectItem value="μg/μL">μg/μL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dna-length">DNA Length (base pairs)</Label>
            <Input 
              id="dna-length"
              type="number"
              value={dnaLength}
              onChange={(e) => setDNALength(parseFloat(e.target.value) || 0)}
              placeholder="Enter DNA length in bp"
              step="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target-amount">Amount needed for reaction (ng)</Label>
            <Input 
              id="target-amount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter target amount"
              step="any"
            />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="text-sm font-medium text-gray-500">Volume Needed:</div>
            <div className="text-xl font-semibold text-lab-blue mt-2">{volumeNeeded}</div>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="text-sm font-medium text-gray-500">DNA Molarity:</div>
            <div className="text-xl font-semibold text-lab-blue mt-2">{molarity}</div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h4 className="font-medium mb-2">PCR Setup Guidelines:</h4>
          <div className="text-sm text-gray-600 space-y-4">
            <p>
              <strong>Typical PCR reaction (50 μL):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Template DNA: 10-100 ng (genomic), 1-10 ng (plasmid)</li>
              <li>Forward primer (10 μM): 1 μL</li>
              <li>Reverse primer (10 μM): 1 μL</li>
              <li>dNTPs (10 mM each): 1 μL</li>
              <li>10X buffer: 5 μL</li>
              <li>DNA polymerase: 0.25-1 μL</li>
              <li>Water: to 50 μL</li>
            </ul>
            <p>
              <strong>Common considerations:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>For GC-rich templates, add 5-10% DMSO or use a specialized buffer</li>
              <li>Primer Tm should ideally be 55-65°C for standard PCR</li>
              <li>Extension time typically calculated as 1 minute per kb of target</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCRCalculator;
