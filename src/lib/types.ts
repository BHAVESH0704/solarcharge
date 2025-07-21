export type StationStatus = "Available" | "Charging" | "Unavailable" | "Maintenance";

export interface Station {
  id: string;
  name: string;
  location: string;
  status: StationStatus;
  powerOutput: number; // in kW
  energyConsumed: number; // in kWh today
  connectorType: "Type 2" | "CCS" | "CHAdeMO";
}

export interface Session {
  id: string;
  stationId: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  energyConsumed: number; // in kWh
  cost: number;
}

export interface EnergyDataPoint {
  time: string;
  value: number;
}
