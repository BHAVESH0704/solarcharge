"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Station } from '@/lib/types';
import L from 'leaflet';
import { Button } from './ui/button';

// Fix for default icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface MapProps {
    stations: Station[];
}

export default function Map({ stations }: MapProps) {
    const position: [number, number] = [18.5204, 73.8567]; // Default to Pune

    return (
        <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map(station => (
                <Marker key={station.id} position={[station.lat, station.lng]}>
                    <Popup>
                        <div>
                            <h3 className="font-bold">{station.name}</h3>
                            <p>{station.location}</p>
                            <p>Status: <span className="font-semibold">{station.status}</span></p>
                            <Button size="sm" className="mt-2 w-full" asChild>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`} target="_blank" rel="noopener noreferrer">
                                  Navigate
                                </a>
                            </Button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
