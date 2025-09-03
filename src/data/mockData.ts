import { Vehicle, City, TransportMode } from '@/types';

// Mock vehicle data for each city and transport mode
export const getMockVehicles = (city: City, transportMode?: TransportMode): Vehicle[] => {
  const cityData = {
    mumbai: {
      bus: [
        { id: 'mumbai-bus-1', route: 'BEST 1', lat: 19.0760, lng: 72.8777, occupancy: 'medium' as const },
        { id: 'mumbai-bus-2', route: 'BEST 45', lat: 19.0860, lng: 72.8677, occupancy: 'low' as const },
        { id: 'mumbai-bus-3', route: 'BEST 201', lat: 19.0660, lng: 72.8877, occupancy: 'full' as const },
      ],
      metro: [
        { id: 'mumbai-metro-1', route: 'Line 1 (Blue)', lat: 19.0560, lng: 72.8377, occupancy: 'full' as const },
        { id: 'mumbai-metro-2', route: 'Line 2A (Yellow)', lat: 19.0960, lng: 72.8977, occupancy: 'medium' as const },
      ],
      train: [
        { id: 'mumbai-train-1', route: 'Western Line', lat: 19.0460, lng: 72.8177, occupancy: 'full' as const },
        { id: 'mumbai-train-2', route: 'Central Line', lat: 19.1060, lng: 72.8777, occupancy: 'medium' as const },
        { id: 'mumbai-train-3', route: 'Harbour Line', lat: 19.0260, lng: 72.8577, occupancy: 'low' as const },
      ]
    },
    bangalore: {
      bus: [
        { id: 'bangalore-bus-1', route: 'BMTC V-500', lat: 12.9716, lng: 77.5946, occupancy: 'low' as const },
        { id: 'bangalore-bus-2', route: 'BMTC 201E', lat: 12.9816, lng: 77.5846, occupancy: 'medium' as const },
        { id: 'bangalore-bus-3', route: 'BMTC G-4', lat: 12.9616, lng: 77.6046, occupancy: 'full' as const },
      ],
      metro: [
        { id: 'bangalore-metro-1', route: 'Purple Line', lat: 12.9516, lng: 77.5746, occupancy: 'medium' as const },
        { id: 'bangalore-metro-2', route: 'Green Line', lat: 12.9916, lng: 77.6146, occupancy: 'low' as const },
      ],
      train: [
        { id: 'bangalore-train-1', route: 'Bangalore-Mysore', lat: 12.9316, lng: 77.5546, occupancy: 'low' as const },
        { id: 'bangalore-train-2', route: 'Bangalore-Chennai', lat: 12.9116, lng: 77.6346, occupancy: 'medium' as const },
      ]
    },
    delhi: {
      bus: [
        { id: 'delhi-bus-1', route: 'DTC 764', lat: 28.6139, lng: 77.2090, occupancy: 'medium' as const },
        { id: 'delhi-bus-2', route: 'DTC 543', lat: 28.6239, lng: 77.1990, occupancy: 'full' as const },
        { id: 'delhi-bus-3', route: 'Cluster 511', lat: 28.6039, lng: 77.2190, occupancy: 'low' as const },
      ],
      metro: [
        { id: 'delhi-metro-1', route: 'Red Line', lat: 28.5939, lng: 77.1890, occupancy: 'full' as const },
        { id: 'delhi-metro-2', route: 'Blue Line', lat: 28.6339, lng: 77.2290, occupancy: 'medium' as const },
        { id: 'delhi-metro-3', route: 'Yellow Line', lat: 28.5739, lng: 77.2390, occupancy: 'low' as const },
      ],
      train: [
        { id: 'delhi-train-1', route: 'Rajdhani Express', lat: 28.6439, lng: 77.1690, occupancy: 'medium' as const },
        { id: 'delhi-train-2', route: 'Shatabdi Express', lat: 28.5539, lng: 77.2590, occupancy: 'low' as const },
      ]
    }
  };

  const vehicles = transportMode 
    ? cityData[city][transportMode] || []
    : Object.values(cityData[city]).flat();

  return vehicles.map(vehicle => ({
    ...vehicle,
    type: vehicle.id.includes('bus') ? 'bus' : 
          vehicle.id.includes('metro') ? 'metro' : 'train',
    city,
    lat: vehicle.lat + (Math.random() - 0.5) * 0.01,
    lng: vehicle.lng + (Math.random() - 0.5) * 0.01,
    eta: `${Math.floor(Math.random() * 15) + 1} min`
  }));
};

export const getRouteOptions = (city: City, transportMode: TransportMode): string[] => {
  const routes = {
    mumbai: {
      bus: ['BEST 1', 'BEST 45', 'BEST 201', 'BEST 315', 'BEST 421'],
      metro: ['Line 1 (Blue)', 'Line 2A (Yellow)', 'Line 2B (Yellow)', 'Line 3 (Aqua)'],
      train: ['Western Line', 'Central Line', 'Harbour Line', 'Trans-Harbour']
    },
    bangalore: {
      bus: ['BMTC V-500', 'BMTC 201E', 'BMTC G-4', 'BMTC AS-1', 'BMTC KBS-1'],
      metro: ['Purple Line', 'Green Line', 'Blue Line'],
      train: ['Bangalore-Mysore', 'Bangalore-Chennai', 'Bangalore-Hubli']
    },
    delhi: {
      bus: ['DTC 764', 'DTC 543', 'Cluster 511', 'DTC 620', 'Cluster 347'],
      metro: ['Red Line', 'Blue Line', 'Yellow Line', 'Green Line', 'Violet Line', 'Pink Line'],
      train: ['Rajdhani Express', 'Shatabdi Express', 'Duronto Express', 'Gatimaan Express']
    }
  };

  return routes[city][transportMode] || [];
};