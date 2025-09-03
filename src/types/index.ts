export type City = 'mumbai' | 'bangalore' | 'delhi';
export type TransportMode = 'bus' | 'metro' | 'train';
export type VehicleType = 'bus' | 'metro' | 'train' | 'monorail';

export interface CityInfo {
  name: string;
  coordinates: [number, number];
  displayName: string;
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  lat: number;
  lng: number;
  occupancy: 'low' | 'medium' | 'full';
  route: string;
  eta?: string;
  city: City;
}

export interface DriverProfile {
  name: string;
  vehicleType: VehicleType;
  routeId: string;
  city: City;
}

export const CITIES: Record<City, CityInfo> = {
  mumbai: {
    name: 'mumbai',
    coordinates: [19.0760, 72.8777],
    displayName: 'Mumbai'
  },
  bangalore: {
    name: 'bangalore', 
    coordinates: [12.9716, 77.5946],
    displayName: 'Bangalore'
  },
  delhi: {
    name: 'delhi',
    coordinates: [28.6139, 77.2090],
    displayName: 'Delhi'
  }
};