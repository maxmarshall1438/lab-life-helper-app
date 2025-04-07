
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BeakerIcon, Atom } from 'lucide-react';
import MassConverter from './converters/MassConverter';
import VolumeConverter from './converters/VolumeConverter';
import TemperatureConverter from './converters/TemperatureConverter';
import ConcentrationConverter from './converters/ConcentrationConverter';
import PressureConverter from './converters/PressureConverter';
import FlowRateConverter from './converters/FlowRateConverter';
import CentrifugeCalculator from '@/components/calculators/chemistry/CentrifugeCalculator';

const UnitConverter = () => {
  const [activeTab, setActiveTab] = useState('mass');

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-lab-lightBlue">
        <div className="flex items-center gap-2">
          <BeakerIcon className="h-6 w-6 text-lab-blue" />
          <CardTitle>Unit Converter</CardTitle>
        </div>
        <CardDescription>
          Convert between common laboratory units of measurement
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="mass" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-6">
            <TabsTrigger value="mass">Mass</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="concentration">Concentration</TabsTrigger>
            <TabsTrigger value="pressure">Pressure</TabsTrigger>
            <TabsTrigger value="flowrate">Flow Rate</TabsTrigger>
            <TabsTrigger value="centrifuge">RPM/RCF</TabsTrigger>
          </TabsList>
          <TabsContent value="mass" className="mt-0">
            <MassConverter />
          </TabsContent>
          <TabsContent value="volume" className="mt-0">
            <VolumeConverter />
          </TabsContent>
          <TabsContent value="temperature" className="mt-0">
            <TemperatureConverter />
          </TabsContent>
          <TabsContent value="concentration" className="mt-0">
            <ConcentrationConverter />
          </TabsContent>
          <TabsContent value="pressure" className="mt-0">
            <PressureConverter />
          </TabsContent>
          <TabsContent value="flowrate" className="mt-0">
            <FlowRateConverter />
          </TabsContent>
          <TabsContent value="centrifuge" className="mt-0">
            <CentrifugeCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
