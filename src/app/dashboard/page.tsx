
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { cn } from "@/lib/utils";
import { collection } from "firebase/firestore";
import { BatteryCharging, Power, Thermometer, Zap } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const firestore = useFirestore();
  const stationsQuery = useMemoFirebase(() => collection(firestore, 'chargingStations'), [firestore]);
  const { data: stations, isLoading } = useCollection(stationsQuery);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Station Dashboard</h1>
        <Button asChild aria-label="Add a new charging station">
          <Link href="/dashboard/stations/new">Add New Station</Link>
        </Button>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
               <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
            </CardContent>
          </Card>
        ))}
        {stations?.map((station) => (
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
              <div className="text-2xl font-bold">{station.powerOutput?.toFixed(1)} kW</div>
              <p className="text-xs text-muted-foreground">{station.location}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>{station.id.substring(0, 6)}...</span>
                </div>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="h-4 w-4 text-primary" />
                  <span>{station.energyConsumed?.toFixed(1)} kWh</span>
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
      
      {!isLoading && stations?.length === 0 && (
        <div className="text-center py-20 rounded-lg border-2 border-dashed border-border mt-4">
            <h2 className="text-xl font-semibold">No Stations Found</h2>
            <p className="text-muted-foreground mt-2">You haven't added any charging stations yet.</p>
            <Button asChild className="mt-4">
                <Link href="/dashboard/stations/new">Add Your First Station</Link>
            </Button>
        </div>
      )}
    </>
  );
}
