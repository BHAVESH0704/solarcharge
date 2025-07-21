"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { mockEnergyGeneration, mockBatteryStatus, mockEnergyBreakdown } from "@/lib/data";
import { Leaf, Zap, Sun } from "lucide-react";

const chartConfig = {
  energy: {
    label: "Energy (kWh)",
    color: "hsl(var(--primary))",
  },
  battery: {
    label: "Battery %",
    color: "hsl(var(--accent))",
  },
  solar: {
    label: "Solar",
    color: "hsl(var(--chart-4))",
  },
  grid: {
    label: "Grid",
    color: "hsl(var(--muted))",
  },
};

export default function AnalyticsPage() {
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Energy Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy Generated (Today)</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452.1 kWh</div>
            <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Battery Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Stable | Discharging at 2.1 kW</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Emissions Saved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 kg</div>
            <p className="text-xs text-muted-foreground">Equivalent to planting 20 trees</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Daily Energy Generation (kWh)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={mockEnergyGeneration}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-energy)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Energy Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[250px]"
            >
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={mockEnergyBreakdown} dataKey="value" nameKey="name" innerRadius={60} />
                <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Battery Status Over Time (%)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={mockBatteryStatus}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-battery)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
