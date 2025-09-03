import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TransitMap from "@/components/TransitMap";
import { MapPin, Navigation, MessageSquare, ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Vehicle, City, TransportMode, CITIES } from "@/types";
import { getMockVehicles } from "@/data/mockData";

const TravelerHome = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<TransportMode | null>(null);

  useEffect(() => {
    const city = localStorage.getItem('selected-city') as City;
    const transport = localStorage.getItem('selected-transport') as TransportMode;
    
    if (!city || !CITIES[city]) {
      navigate('/traveler/city-select');
      return;
    }
    
    setSelectedCity(city);
    setSelectedTransport(transport);
  }, [navigate]);

  // Generate city and transport specific vehicles
  useEffect(() => {
    if (!selectedCity) return;

    const generateVehicles = () => {
      return getMockVehicles(selectedCity, selectedTransport || undefined);
    };

    setVehicles(generateVehicles());

    // Update positions every 5 seconds
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        lat: vehicle.lat + (Math.random() - 0.5) * 0.001,
        lng: vehicle.lng + (Math.random() - 0.5) * 0.001,
        eta: `${Math.floor(Math.random() * 15) + 1} min`
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedCity, selectedTransport]);

  if (!selectedCity) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/traveler/city-select')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">{CITIES[selectedCity].displayName}</h1>
                {selectedTransport && (
                  <Badge variant="secondary" className="capitalize">
                    {selectedTransport}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedTransport ? `${selectedTransport} tracking` : 'All transit modes'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/traveler/transport-select')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Change Mode
            </Button>
            <Button onClick={() => navigate('/traveler/route-planner')}>
              <Navigation className="w-4 h-4 mr-2" />
              Plan Route
            </Button>
            <Button variant="outline" onClick={() => navigate('/traveler/feedback')}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto p-4 gap-4">
        {/* Map */}
        <div className="flex-1">
          <TransitMap 
            vehicles={vehicles}
            onVehicleSelect={setSelectedVehicle}
            cityCenter={CITIES[selectedCity].coordinates}
            className="h-[calc(100vh-200px)]"
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          {selectedVehicle ? (
            <Card className="p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                {selectedVehicle.type.charAt(0).toUpperCase() + selectedVehicle.type.slice(1)} {selectedVehicle.route}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ETA:</span>
                  <span className="font-medium text-primary">{selectedVehicle.eta}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Occupancy:</span>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      selectedVehicle.occupancy === 'low' ? 'bg-train' : 
                      selectedVehicle.occupancy === 'medium' ? 'bg-bus' : 'bg-destructive'
                    }`}></div>
                    <span className="font-medium capitalize">{selectedVehicle.occupancy}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Click on other vehicles on the map to see their details
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4">
              <h3 className="font-bold text-lg mb-3">Select a Vehicle</h3>
              <p className="text-sm text-muted-foreground">
                Click on any vehicle marker on the map to see real-time information including ETA and occupancy levels.
              </p>
            </Card>
          )}

          {/* Live Stats */}
          <Card className="p-4">
            <h3 className="font-bold text-lg mb-3">Live Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Vehicles:</span>
                <span className="font-medium">{vehicles.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Low Occupancy:</span>
                <span className="font-medium text-train">
                  {vehicles.filter(v => v.occupancy === 'low').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Medium Occupancy:</span>
                <span className="font-medium text-bus">
                  {vehicles.filter(v => v.occupancy === 'medium').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Occupancy:</span>
                <span className="font-medium text-destructive">
                  {vehicles.filter(v => v.occupancy === 'full').length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelerHome;