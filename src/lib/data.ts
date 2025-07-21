import type { Station, Session, EnergyDataPoint } from "./types";

export const mockStations: Station[] = [
  {
    id: "SC-001",
    name: "Downtown Supercharge",
    location: "123 Main St, Metropolis",
    status: "Available",
    powerOutput: 7.2,
    energyConsumed: 45.3,
    connectorType: "Type 2",
  },
  {
    id: "SC-002",
    name: "Uptown Solar Hub",
    location: "456 Oak Ave, Star City",
    status: "Charging",
    powerOutput: 50.1,
    energyConsumed: 120.8,
    connectorType: "CCS",
  },
  {
    id: "SC-003",
    name: "Eastside Retail Park",
    location: "789 Pine Ln, Gotham",
    status: "Available",
    powerOutput: 11.5,
    energyConsumed: 88.1,
    connectorType: "Type 2",
  },
  {
    id: "SC-004",
    name: "Westend Library",
    location: "101 Maple Dr, Central City",
    status: "Unavailable",
    powerOutput: 0,
    energyConsumed: 32.5,
    connectorType: "CHAdeMO",
  },
  {
    id: "SC-005",
    name: "North Industrial Zone",
    location: "212 Birch Rd, Coast City",
    status: "Maintenance",
    powerOutput: 0,
    energyConsumed: 67.4,
    connectorType: "CCS",
  },
  {
    id: "SC-006",
    name: "South Beach Front",
    location: "333 Ocean Blvd, Atlantis",
    status: "Available",
    powerOutput: 22.0,
    energyConsumed: 15.6,
    connectorType: "Type 2",
  },
];

export const mockSessions: Session[] = [
  {
    id: "SESS-101",
    stationId: "SC-002",
    startTime: new Date(new Date().setDate(new Date().getDate() - 1)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(new Date().getHours() + 2)),
    duration: "2h 15m",
    energyConsumed: 42.5,
    cost: 12.75,
  },
  {
    id: "SESS-102",
    stationId: "SC-003",
    startTime: new Date(new Date().setDate(new Date().getDate() - 2)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(new Date().getHours() + 1)),
    duration: "1h 30m",
    energyConsumed: 30.1,
    cost: 9.03,
  },
  {
    id: "SESS-103",
    stationId: "SC-001",
    startTime: new Date(new Date().setDate(new Date().getDate() - 3)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 3)).setHours(new Date().getHours() + 4)),
    duration: "4h 5m",
    energyConsumed: 25.8,
    cost: 7.74,
  },
  {
    id: "SESS-104",
    stationId: "SC-006",
    startTime: new Date(new Date().setDate(new Date().getDate() - 4)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 4)).setHours(new Date().getHours() + 3)),
    duration: "3h 22m",
    energyConsumed: 55.2,
    cost: 16.56,
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
