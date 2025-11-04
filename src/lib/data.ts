import type { Station, Session, EnergyDataPoint } from "./types";
import { Timestamp } from "firebase/firestore";

// This file now primarily serves as a reference for data shapes or for fallback data.
// The main application data is now fetched from Firestore.

export const mockStations: Station[] = [
  {
    id: "SC-001",
    name: "Koregaon Park Power-Up",
    location: "Lane 7, Koregaon Park, Pune",
    status: "Available",
    powerOutput: 7.2,
    energyConsumed: 45.3,
    connectorType: "Type 2",
    lat: 18.5362,
    lng: 73.8937
  },
  {
    id: "SC-002",
    name: "Viman Nagar Volt",
    location: "Near Symbiosis College, Viman Nagar, Pune",
    status: "Charging",
    powerOutput: 50.1,
    energyConsumed: 120.8,
    connectorType: "CCS",
    lat: 18.5679,
    lng: 73.9143
  },
];

export const mockSessions: Session[] = [
  {
    id: "SESS-101",
    userId: "user-123",
    stationId: "SC-002",
    startTime: Timestamp.fromDate(new Date(new Date().setDate(new Date().getDate() - 1))),
    endTime: Timestamp.fromDate(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(new Date().getHours() + 2))),
    duration: "2h 15m",
    energyConsumed: 42.5,
    cost: 850.00,
  },
];

export const mockEnergyGeneration: EnergyDataPoint[] = [
  { time: "00:00", value: 0 }, { time: "02:00", value: 0 },
  { time: "04:00", value: 0 }, { time: "06:00", value: 5 },
  { time: "08:00", value: 25 }, { time: "10:00", value: 60 },
  { time: "12:00", value: 90 }, { time: "14:00", value: 85 },
  { time: "16:00", value: 55 }, { time: "18:00", value: 15 },
  { time: "20:00", value: 0 }, { time: "22:00", value: 0 },
];

export const mockBatteryStatus: EnergyDataPoint[] = [
    { time: "00:00", value: 80 }, { time: "02:00", value: 75 },
    { time: "04:00", value: 70 }, { time: "06:00", value: 72 },
    { time: "08:00", value: 78 }, { time: "10:00", value: 85 },
    { time: "12:00", value: 95 }, { time: "14:00", value: 90 },
    { time: "16:00", value: 82 }, { time: "18:00", value: 65 },
    { time: "20:00", value: 50 }, { time: "22:00", value: 60 },
];

export const mockEnergyBreakdown = [
    { name: "Solar", value: 400, fill: "var(--color-solar)" },
    { name: "Grid", value: 150, fill: "var(--color-grid)" },
];
