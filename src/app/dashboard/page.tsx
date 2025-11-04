
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockStations } from "@/lib/data";
import type { StationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BatteryCharging, Power, Thermometer, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const getStatusClass = (status: StationStatus) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Charging":
        return "bg-blue-500";
      case "Unavailable":
        return "bg-red-500";
      case "Maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Station Dashboard</h1>
        <Button asChild aria-label="Add a new charging station">
          <Link href="/dashboard/stations/new">Add New Station</Link>
        </Button>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockStations.map((station) => (
          <Card key={station.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{station.name}</CardTitle>
              <Badge variant={station.status === 'Available' ? 'default' : 'secondary'} className={cn(
                  "border-transparent text-primary-foreground",
                  station.status === 'Available' && 'bg-green-600 hover:bg-green-700',
                  station.status === 'Charging' && 'bg-blue-600 hover:bg-blue-700',
                  (station.status === 'Unavailable' || station.status === 'Maintenance') && 'bg-destructive hover:bg-destructive/90',
              )}>
                {station.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{station.id}</div>
              <p className="text-xs text-muted-foreground">{station.location}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>{station.powerOutput.toFixed(1)} kW</span>
                </div>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="h-4 w-4 text-primary" />
                  <span>{station.energyConsumed.toFixed(1)} kWh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Power className="h-4 w-4 text-primary" />
                  <span>{station.connectorType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-primary" />
                  <span>25 °C</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
