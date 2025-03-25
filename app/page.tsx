'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Users, Bed, Clock, UserCog, House, User, Dot, Shield, Wrench } from 'lucide-react';
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
  const [classPrice, setClassPrice] = useState(35);
  const [classesPerWeek, setClassesPerWeek] = useState(30);
  const [beds, setBeds] = useState(6);
  const [occupancy, setOccupancy] = useState(70);
  const [teacherRate, setTeacherRate] = useState(40);
  const [rent, setRent] = useState(2000);
  const [transactionFee, setTransactionFee] = useState(3);
  const [frontDeskSalary, setFrontDeskSalary] = useState(2000);
  const [miscellaneousExpense, setMiscellaneousExpense] = useState(500);
  const [insurance, setInsurance] = useState(500);
  const [utilities, setUtilities] = useState(400);

  const [chartData, setChartData] = useState<{ occupancy: number; profit: number }[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 11 }, (_, i) => {
      const currentOccupancy = i * 10;
      const studentsPerClass = (beds * currentOccupancy) / 100;
      const weeklyRevenue = classPrice * studentsPerClass * classesPerWeek;
      const weeklyTeacherCost = teacherRate * classesPerWeek;
      const weeklyProfit = weeklyRevenue - weeklyTeacherCost;
      const transactionFees = weeklyRevenue * (transactionFee / 100) * 4;
      const monthlyCost = rent + frontDeskSalary + miscellaneousExpense + insurance + utilities + transactionFees;
      const monthlyProfit = weeklyProfit * 4 - monthlyCost;

      return {
        occupancy: currentOccupancy,
        profit: monthlyProfit,
      };
    });

    setChartData(data);
  }, [classPrice, classesPerWeek, beds, occupancy, teacherRate, rent, frontDeskSalary, miscellaneousExpense, insurance, utilities]);

  const calculateMetrics = () => {
    const studentsPerClass = (beds * occupancy) / 100;
    const weeklyRevenue = classPrice * studentsPerClass * classesPerWeek;
    const weeklyTeacherCost = teacherRate * classesPerWeek;
    const weeklyProfit = weeklyRevenue - weeklyTeacherCost;
    const transactionFees = weeklyRevenue * (transactionFee / 100) * 4;
    const monthlyCost = rent + frontDeskSalary + miscellaneousExpense + insurance + utilities + transactionFees;
    const monthlyProfit = weeklyProfit * 4 - monthlyCost;

    return {
      studentsPerClass,
      weeklyRevenue,
      weeklyTeacherCost,
      weeklyProfit,
      monthlyRevenue: weeklyRevenue * 4,
      monthlyTeacherCost: weeklyTeacherCost * 4,
      monthlyCost,
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
            <h2 className="text-2xl font-light mb-6">Studio Configuration</h2>
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
              <h2 className="text-2xl font-light mb-6">Monthly fixed costs</h2>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <House className="w-4 h-4" />
                  Rent
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[rent]}
                    onValueChange={(value) => setRent(value[0])}
                    min={0}
                    max={5000}
                    step={50}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{rent}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Front Desk Salary
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[frontDeskSalary]}
                    onValueChange={(value) => setFrontDeskSalary(value[0])}
                    min={0}
                    max={5000}
                    step={50}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{frontDeskSalary}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Dot className="w-4 h-4" />
                  Miscellaneous Expense
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[miscellaneousExpense]}
                    onValueChange={(value) => setMiscellaneousExpense(value[0])}
                    min={0}
                    max={2000}
                    step={100}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{miscellaneousExpense}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Dot className="w-4 h-4" />
                  Transaction Fees
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[transactionFee]}
                    onValueChange={(value) => setTransactionFee(value[0])}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {transactionFee}% of revenue
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Insurance
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[insurance]}
                    onValueChange={(value) => setInsurance(value[0])}
                    min={0}
                    max={1000}
                    step={25}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{insurance}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Utilities
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[utilities]}
                    onValueChange={(value) => setUtilities(value[0])}
                    min={0}
                    max={1000}
                    step={25}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    €{utilities}
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
                  <p className="text-sm text-muted-foreground">Monthly Costs</p>
                  <p className="text-2xl font-light">
                    €{metrics.monthlyCost.toLocaleString()}
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
            
          </div>
        </div>
      </div>
    </main>
  )};
