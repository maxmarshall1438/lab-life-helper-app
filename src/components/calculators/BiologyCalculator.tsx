
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube } from 'lucide-react';
import CellCultureCalculator from './biology/CellCultureCalculator';
import ProteinCalculator from './biology/ProteinCalculator';
import PCRCalculator from './biology/PCRCalculator';

const BiologyCalculator = () => {
  const [activeTab, setActiveTab] = useState('cell-culture');

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-lab-lightBlue">
        <div className="flex items-center gap-2">
          <TestTube className="h-6 w-6 text-lab-blue" />
          <CardTitle>Biology Calculators</CardTitle>
        </div>
        <CardDescription>
          Essential calculators for biology lab work
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="cell-culture" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-6">
            <TabsTrigger value="cell-culture">Cell Culture</TabsTrigger>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="pcr">PCR</TabsTrigger>
          </TabsList>
          <TabsContent value="cell-culture" className="mt-0">
            <CellCultureCalculator />
          </TabsContent>
          <TabsContent value="protein" className="mt-0">
            <ProteinCalculator />
          </TabsContent>
          <TabsContent value="pcr" className="mt-0">
            <PCRCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BiologyCalculator;
