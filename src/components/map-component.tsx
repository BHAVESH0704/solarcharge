"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Station } from '@/lib/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import L from 'leaflet';

// Fix for default icon path issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});


interface MapComponentProps {
  stations: Station[];
}

export default function MapComponent({ stations }: MapComponentProps) {
  const getStatusClass = (status: Station['status']) => {
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
    <MapContainer center={[18.5204, 73.8567]} zoom={12} scrollWheelZoom={false} className="h-full w-full rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map(station => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-base mb-1">{station.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{station.location}</p>
              <Badge variant="outline" className={cn("text-xs", getStatusClass(station.status))}>{station.status}</Badge>
              <div className="mt-2 text-xs">
                <p>Power: {station.powerOutput} kW</p>
                <p>Connector: {station.connectorType}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
