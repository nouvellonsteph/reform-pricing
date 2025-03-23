'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Users, Bed, Clock, UserCog } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Home() {
  const [classPrice, setClassPrice] = useState(45);
  const [classesPerWeek, setClassesPerWeek] = useState(30);
  const [beds, setBeds] = useState(8);
  const [occupancy, setOccupancy] = useState(80);
  const [teacherRate, setTeacherRate] = useState(35);

  const [chartData, setChartData] = useState<{ occupancy: number; profit: number }[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 11 }, (_, i) => {
      const currentOccupancy = i * 10;
      const studentsPerClass = (beds * currentOccupancy) / 100;
      const weeklyRevenue = classPrice * studentsPerClass * classesPerWeek;
      const weeklyTeacherCost = teacherRate * classesPerWeek;
      const weeklyProfit = weeklyRevenue - weeklyTeacherCost;
      const monthlyProfit = weeklyProfit * 4;

      return {
        occupancy: currentOccupancy,
        profit: monthlyProfit,
      };
    });

    setChartData(data);
  }, [classPrice, classesPerWeek, beds, occupancy, teacherRate]);

  const calculateMetrics = () => {
    const studentsPerClass = (beds * occupancy) / 100;
    const weeklyRevenue = classPrice * studentsPerClass * classesPerWeek;
    const weeklyTeacherCost = teacherRate * classesPerWeek;
    const weeklyProfit = weeklyRevenue - weeklyTeacherCost;
    const monthlyProfit = weeklyProfit * 4;

    return {
      studentsPerClass,
      weeklyRevenue,
      weeklyTeacherCost,
      weeklyProfit,
      monthlyRevenue: weeklyRevenue * 4,
      monthlyTeacherCost: weeklyTeacherCost * 4,
      monthlyProfit,
    };
  };

  const metrics = calculateMetrics();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-wider mb-2">Re.form</h1>
          <p className="text-muted-foreground">Pricing Strategy Simulator</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-light mb-6">Input Parameters</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Class Price
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[classPrice]}
                    onValueChange={(value) => setClassPrice(value[0])}
                    min={20}
                    max={100}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{classPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Classes per Week
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[classesPerWeek]}
                    onValueChange={(value) => setClassesPerWeek(value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {classesPerWeek} classes
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  Number of Reformer Beds
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[beds]}
                    onValueChange={(value) => setBeds(value[0])}
                    min={4}
                    max={16}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {beds} beds
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Occupancy Rate (%)
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[occupancy]}
                    onValueChange={(value) => setOccupancy(value[0])}
                    min={0}
                    max={100}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {occupancy}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  Teacher Rate per Hour
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[teacherRate]}
                    onValueChange={(value) => setTeacherRate(value[0])}
                    min={20}
                    max={60}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{teacherRate}/hr
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-light mb-6">Monthly Projections</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-light">
                    €{metrics.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teacher Cost</p>
                  <p className="text-2xl font-light">
                    €{metrics.monthlyTeacherCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profit</p>
                  <p className="text-2xl font-light">
                    €{metrics.monthlyProfit.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-2xl font-light mb-6">Profit by Occupancy</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 60, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="occupancy"
                      label={{
                        value: 'Occupancy Rate (%)',
                        position: 'bottom',
                        offset: 20,
                      }}
                    />
                    <YAxis
                      label={{
                        value: 'Monthly Profit (€)',
                        angle: -90,
                        position: 'left',
                        offset: 40,
                      }}
                      tickFormatter={(value) => `€${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                      }}
                      formatter={(value) => [`€${value.toLocaleString()}`, 'Profit']}
                      labelFormatter={(value) => `Occupancy: ${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-light mb-6">Detailed Calculations</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Class Capacity</p>
                  <div className="pl-4 space-y-1">
                    <p>Total Beds: {beds}</p>
                    <p>Occupancy Rate: {occupancy}%</p>
                    <p>Students per Class: {metrics.studentsPerClass.toFixed(1)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Weekly Revenue</p>
                  <div className="pl-4 space-y-1">
                    <p>Classes per Week: {classesPerWeek}</p>
                    <p>Price per Class: €{classPrice}</p>
                    <p>Students per Class: {metrics.studentsPerClass.toFixed(1)}</p>
                    <p className="font-medium">Total: €{metrics.weeklyRevenue.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Weekly Costs</p>
                  <div className="pl-4 space-y-1">
                    <p>Teacher Rate: €{teacherRate}/hr</p>
                    <p>Classes per Week: {classesPerWeek}</p>
                    <p className="font-medium">Total: €{metrics.weeklyTeacherCost.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Weekly Profit</p>
                  <div className="pl-4 space-y-1">
                    <p>Revenue: €{metrics.weeklyRevenue.toFixed(2)}</p>
                    <p>Costs: €{metrics.weeklyTeacherCost.toFixed(2)}</p>
                    <p className="font-medium">Profit: €{metrics.weeklyProfit.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Totals (4 weeks)</p>
                  <div className="pl-4 space-y-1">
                    <p>Revenue: €{metrics.monthlyRevenue.toFixed(2)}</p>
                    <p>Costs: €{metrics.monthlyTeacherCost.toFixed(2)}</p>
                    <p className="font-medium">Profit: €{metrics.monthlyProfit.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Card>
            
          </div>
        </div>
      </div>
    </main>
  );
}