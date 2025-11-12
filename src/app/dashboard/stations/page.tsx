
"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { Station, StationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { collection } from "firebase/firestore";
import { PlusCircle, Search, SlidersHorizontal } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full mb-6 rounded-lg" />
});

export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const firestore = useFirestore();
  const stationsQuery = useMemoFirebase(() => collection(firestore, 'chargingStations'), [firestore]);
  const { data: stations, isLoading } = useCollection(stationsQuery);

  const filteredStations = stations?.filter((station) =>
    (station.name && station.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (station.location && station.location.toLowerCase().includes(searchTerm.toLowerCase()))
  ) as Station[] | undefined;
  
  const getStatusClass = (status: StationStatus) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700";
      case "Charging":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700";
      case "Unavailable":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Find a Station</h1>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or location..."
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search stations by name or location"
            />
          </div>
          <Button variant="outline" aria-label="Filter stations">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button asChild aria-label="Add a new charging station">
             <Link href="/dashboard/stations/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Station
             </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Map stations={filteredStations || []} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
             <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
          </Card>
        ))}
        {filteredStations?.map((station) => (
          <Card key={station.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{station.name}</CardTitle>
                <Badge variant="outline" className={cn("text-xs", getStatusClass(station.status))}>{station.status}</Badge>
              </div>
              <CardDescription>{station.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative h-40 w-full mb-4">
                <Image src={`https://placehold.co/400x300.png`} data-ai-hint="charging station" alt={station.name} fill className="rounded-md object-cover"/>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Connector: <span className="font-semibold text-foreground">{station.connectorType}</span></p>
                <p>Power: <span className="font-semibold text-foreground">{station.powerOutput} kW</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/stations/${station.id}`}>Details</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`} target="_blank" rel="noopener noreferrer">
                  Navigate
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
