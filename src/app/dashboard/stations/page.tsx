"use client";

import { useState } from "react";
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
import { mockStations } from "@/lib/data";
import type { Station, StationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { List, Map, Search, SlidersHorizontal } from "lucide-react";
import Image from 'next/image';

export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredStations = mockStations.filter((station) =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="bg-muted p-0.5 rounded-lg flex items-center">
             <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                <List className="h-5 w-5"/>
             </Button>
             <Button variant={viewMode === 'map' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('map')}>
                <Map className="h-5 w-5"/>
             </Button>
          </div>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStations.map((station) => (
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
                  <Image src={`https://placehold.co/400x300.png`} data-ai-hint="charging station" alt={station.name} layout="fill" className="rounded-md object-cover"/>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Connector: <span className="font-semibold text-foreground">{station.connectorType}</span></p>
                  <p>Power: <span className="font-semibold text-foreground">{station.powerOutput} kW</span></p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">Navigate</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <Card className="flex-grow flex items-center justify-center flex-col">
            <Map className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold">Map View Coming Soon</h2>
            <p className="text-muted-foreground">An interactive map of all our stations will be available here.</p>
         </Card>
      )}
    </div>
  );
}
