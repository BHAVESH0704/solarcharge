import type { Timestamp } from "firebase/firestore";

export type StationStatus = "Available" | "Charging" | "Unavailable" | "Maintenance";

export interface Station {
  id: string;
  name: string;
  location: string;
  status: StationStatus;
  powerOutput: number; // in kW
  energyConsumed: number; // in kWh today
  connectorType: "Type 2" | "CCS" | "CHAdeMO";
  lat: number;
  lng: number;
}

export interface Session {
  id: string;
  stationId: string;
  startTime: Timestamp;
  endTime: Timestamp;
  duration: string;
  energyConsumed: number; // in kWh
  cost: number;
  userId: string;
}

export interface EnergyDataPoint {
  time: string;
  value: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  vehicleModel?: string;
  photoURL?: string;
}
