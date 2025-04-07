
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom } from 'lucide-react';
import pHCalculator from './chemistry/pHCalculator';
import DilutionCalculator from './chemistry/DilutionCalculator';
import GasLawCalculator from './chemistry/GasLawCalculator';

const ChemistryCalculator = () => {
  const [activeTab, setActiveTab] = useState('ph');

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-lab-lightBlue">
        <div className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-lab-blue" />
          <CardTitle>Chemistry Calculators</CardTitle>
        </div>
        <CardDescription>
          Essential calculators for chemistry lab work
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="ph" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-6">
            <TabsTrigger value="ph">pH & pOH</TabsTrigger>
            <TabsTrigger value="dilution">Dilutions</TabsTrigger>
            <TabsTrigger value="gas-laws">Gas Laws</TabsTrigger>
          </TabsList>
          <TabsContent value="ph" className="mt-0">
            {pHCalculator()}
          </TabsContent>
          <TabsContent value="dilution" className="mt-0">
            <DilutionCalculator />
          </TabsContent>
          <TabsContent value="gas-laws" className="mt-0">
            <GasLawCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChemistryCalculator;
