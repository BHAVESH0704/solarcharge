
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Station } from '@/lib/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Fix for default icon not showing in Next.js
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;


interface MapProps {
    stations: Station[];
}

export default function Map({ stations }: MapProps) {
    const position: [number, number] = [18.5204, 73.8567]; // Pune coordinates

    return (
        <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map(station => (
                (station.lat && station.lng) && (
                    <Marker key={station.id} position={[station.lat, station.lng]}>
                        <Popup>
                            <b>{station.name}</b><br />
                            {station.location}<br />
                            Status: {station.status}
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
}
