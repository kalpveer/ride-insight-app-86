import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Set up default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Import Vehicle from types
import { Vehicle } from '@/types';

interface TransitMapProps {
  vehicles?: Vehicle[];
  onVehicleSelect?: (vehicle: Vehicle) => void;
  cityCenter?: [number, number];
  className?: string;
}

const vehicleColors = {
  bus: '#fb923c',
  metro: '#3b82f6', 
  train: '#10b981',
  monorail: '#8b5cf6'
};

const occupancyColors = {
  low: '#10b981',
  medium: '#f59e0b',
  full: '#ef4444'
};

const TransitMap = ({ vehicles = [], onVehicleSelect, cityCenter = [37.7749, -122.4194], className = "" }: TransitMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(cityCenter, 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers layer
    markersRef.current.addTo(map);
    
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Add vehicle markers
    vehicles.forEach(vehicle => {
      const vehicleColor = vehicleColors[vehicle.type];
      const occupancyColor = occupancyColors[vehicle.occupancy];
      
      // Create custom icon
      const icon = L.divIcon({
        className: 'custom-transit-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background: ${vehicleColor};
            border: 3px solid ${occupancyColor};
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 10px;
            color: white;
          ">
            ${vehicle.type.charAt(0).toUpperCase()}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([vehicle.lat, vehicle.lng], { icon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm">${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} ${vehicle.route}</h3>
            <p class="text-xs">Occupancy: <span style="color: ${occupancyColor}">${vehicle.occupancy}</span></p>
            ${vehicle.eta ? `<p class="text-xs">ETA: ${vehicle.eta}</p>` : ''}
          </div>
        `)
        .on('click', () => {
          setSelectedVehicle(vehicle);
          onVehicleSelect?.(vehicle);
        });

      markersRef.current.addLayer(marker);
    });
  }, [vehicles, onVehicleSelect]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {selectedVehicle && (
        <div className="absolute top-4 right-4 bg-card p-4 rounded-lg shadow-card max-w-xs">
          <h3 className="font-bold text-sm mb-2">
            {selectedVehicle.type.charAt(0).toUpperCase() + selectedVehicle.type.slice(1)} {selectedVehicle.route}
          </h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Occupancy:</span>
              <span className={`font-medium ${
                selectedVehicle.occupancy === 'low' ? 'text-train' : 
                selectedVehicle.occupancy === 'medium' ? 'text-bus' : 'text-destructive'
              }`}>
                {selectedVehicle.occupancy}
              </span>
            </div>
            {selectedVehicle.eta && (
              <div className="flex justify-between">
                <span>ETA:</span>
                <span className="font-medium">{selectedVehicle.eta}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitMap;