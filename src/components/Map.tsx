
"use client";

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


export default function Map() {
    // This is now just a placeholder. The actual map logic is in StationsPage.
    return (
        <div id="map" style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }} />
    );
}
