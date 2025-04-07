
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProteinCalculator = () => {
  const [calculationType, setCalculationType] = useState('concentration');
  
  // Bradford assay variables
  const [absorbance, setAbsorbance] = useState<number>(0.5);
  const [standardCurveSlope, setStandardCurveSlope] = useState<number>(0.05);
  const [standardCurveIntercept, setStandardCurveIntercept] = useState<number>(0);
  const [dilutionFactor, setDilutionFactor] = useState<number>(1);
  const [concentrationResult, setConcentrationResult] = useState<string>('');
  
  // Molecular weight conversion
  const [aminoAcidSequence, setAminoAcidSequence] = useState<string>('');
  const [molecularWeight, setMolecularWeight] = useState<string>('');
  
  const [error, setError] = useState<string>('');

  // Amino acid molecular weights (Da)
  const aminoAcidWeights: Record<string, number> = {
    'A': 71.08, // Alanine
    'R': 156.19, // Arginine
    'N': 114.11, // Asparagine
    'D': 115.09, // Aspartic acid
    'C': 103.15, // Cysteine
    'E': 129.12, // Glutamic acid
    'Q': 128.13, // Glutamine
    'G': 57.05, // Glycine
    'H': 137.14, // Histidine
    'I': 113.16, // Isoleucine
    'L': 113.16, // Leucine
    'K': 128.17, // Lysine
    'M': 131.19, // Methionine
    'F': 147.18, // Phenylalanine
    'P': 97.12, // Proline
    'S': 87.08, // Serine
    'T': 101.11, // Threonine
    'W': 186.21, // Tryptophan
    'Y': 163.18, // Tyrosine
    'V': 99.13, // Valine
  };

  useEffect(() => {
    if (calculationType === 'concentration') {
      calculateProteinConcentration();
    } else if (calculationType === 'molecular-weight') {
      calculateMolecularWeight();
    }
  }, [calculationType, absorbance, standardCurveSlope, standardCurveIntercept, dilutionFactor, aminoAcidSequence]);

  const calculateProteinConcentration = () => {
    try {
      if (standardCurveSlope === 0) {
        setError('Standard curve slope cannot be zero');
        setConcentrationResult('');
        return;
      }
      
      // Using linear equation: y = mx + b
      // where y is absorbance, m is slope, x is concentration, b is intercept
      // So concentration = (absorbance - intercept) / slope
      const concentration = (absorbance - standardCurveIntercept) / standardCurveSlope;
      
      // Account for dilution factor
      const actualConcentration = concentration * dilutionFactor;
      
      if (actualConcentration < 0) {
        setError('Calculated concentration is negative, please check your standard curve values');
        setConcentrationResult('');
        return;
      }
      
      setConcentrationResult(`${actualConcentration.toFixed(2)} μg/mL`);
      setError('');
    } catch (err) {
      setError('Calculation error');
      setConcentrationResult('');
    }
  };

  const calculateMolecularWeight = () => {
    try {
      if (!aminoAcidSequence) {
        setMolecularWeight('');
        setError('');
        return;
      }
      
      // Remove spaces and convert to uppercase
      const sequence = aminoAcidSequence.replace(/\s+/g, '').toUpperCase();
      
      let totalWeight = 0;
      let unknownAminoAcids = [];
      
      // Calculate weight by summing individual amino acid weights
      for (let i = 0; i < sequence.length; i++) {
        const aa = sequence[i];
        if (aminoAcidWeights[aa]) {
          totalWeight += aminoAcidWeights[aa];
        } else {
          unknownAminoAcids.push(aa);
        }
      }
      
      // Add water (18.02 Da) to account for peptide bond formation (minus one water molecule per peptide bond)
      totalWeight -= (sequence.length - 1) * 18.02;
      
      if (unknownAminoAcids.length > 0) {
        setError(`Unknown amino acid(s): ${[...new Set(unknownAminoAcids)].join(', ')}. Using one-letter codes like A, R, N, etc.`);
      } else {
        setError('');
      }
      
      setMolecularWeight(`${totalWeight.toFixed(2)} Da (${(totalWeight / 1000).toFixed(2)} kDa)`);
    } catch (err) {
      setError('Calculation error');
      setMolecularWeight('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Protein Calculators</h3>
        
        <RadioGroup
          value={calculationType}
          onValueChange={setCalculationType}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concentration" id="concentration" />
            <Label htmlFor="concentration">Protein Concentration (Bradford)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="molecular-weight" id="molecular-weight" />
            <Label htmlFor="molecular-weight">Protein Molecular Weight</Label>
          </div>
        </RadioGroup>
        
        {calculationType === 'concentration' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="absorbance">Absorbance at 595 nm</Label>
                <Input 
                  id="absorbance"
                  type="number"
                  value={absorbance}
                  onChange={(e) => setAbsorbance(parseFloat(e.target.value) || 0)}
                  placeholder="Enter absorbance"
                  step="0.001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dilution-factor">Dilution Factor</Label>
                <Input 
                  id="dilution-factor"
                  type="number"
                  value={dilutionFactor}
                  onChange={(e) => setDilutionFactor(parseFloat(e.target.value) || 1)}
                  placeholder="Enter dilution factor"
                  min="1"
                  step="any"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Standard Curve Parameters:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="curve-slope">Slope (m)</Label>
                  <Input 
                    id="curve-slope"
                    type="number"
                    value={standardCurveSlope}
                    onChange={(e) => setStandardCurveSlope(parseFloat(e.target.value) || 0)}
                    placeholder="Enter standard curve slope"
                    step="any"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="curve-intercept">Y-Intercept (b)</Label>
                  <Input 
                    id="curve-intercept"
                    type="number"
                    value={standardCurveIntercept}
                    onChange={(e) => setStandardCurveIntercept(parseFloat(e.target.value) || 0)}
                    placeholder="Enter standard curve y-intercept"
                    step="any"
                  />
                </div>
              </div>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="p-4 border rounded-md bg-gray-50 mt-4">
              <div className="text-sm font-medium text-gray-500">Protein Concentration:</div>
              <div className="text-xl font-semibold text-lab-blue mt-2">{concentrationResult}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Bradford Assay Notes:</h4>
              <p className="text-sm text-gray-600">
                The Bradford assay is based on an absorbance shift in Coomassie dye when bound to proteins. The standard curve follows the linear equation:
              </p>
              <p className="text-sm text-gray-600 mt-2 italic">
                Absorbance = Slope × Concentration + Intercept
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Linear range is typically 0.1 - 1.4 mg/mL. For accurate results, ensure your sample's absorbance falls within the linear range of your standard curve.
              </p>
            </div>
          </div>
        )}
        
        {calculationType === 'molecular-weight' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amino-acid-sequence">Amino Acid Sequence (one-letter codes)</Label>
              <textarea 
                id="amino-acid-sequence"
                value={aminoAcidSequence}
                onChange={(e) => setAminoAcidSequence(e.target.value)}
                placeholder="e.g., MGKMSTGATA..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="p-4 border rounded-md bg-gray-50 mt-4">
              <div className="text-sm font-medium text-gray-500">Molecular Weight:</div>
              <div className="text-xl font-semibold text-lab-blue mt-2">{molecularWeight}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Amino Acid One-Letter Codes:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                <div>A: Alanine</div>
                <div>R: Arginine</div>
                <div>N: Asparagine</div>
                <div>D: Aspartic acid</div>
                <div>C: Cysteine</div>
                <div>E: Glutamic acid</div>
                <div>Q: Glutamine</div>
                <div>G: Glycine</div>
                <div>H: Histidine</div>
                <div>I: Isoleucine</div>
                <div>L: Leucine</div>
                <div>K: Lysine</div>
                <div>M: Methionine</div>
                <div>F: Phenylalanine</div>
                <div>P: Proline</div>
                <div>S: Serine</div>
                <div>T: Threonine</div>
                <div>W: Tryptophan</div>
                <div>Y: Tyrosine</div>
                <div>V: Valine</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProteinCalculator;
