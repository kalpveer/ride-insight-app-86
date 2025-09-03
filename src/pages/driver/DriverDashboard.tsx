import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Square, MapPin, Users, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DriverSession {
  name: string;
  vehicleId: string;
  vehicleType: string;
  routeId: string;
  city: string;
}

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<DriverSession | null>(null);
  const [isOnTrip, setIsOnTrip] = useState(false);
  const [occupancy, setOccupancy] = useState<'low' | 'medium' | 'full'>('low');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [tripStartTime, setTripStartTime] = useState<Date | null>(null);

  useEffect(() => {
    const profileData = localStorage.getItem('driver-profile');
    if (!profileData) {
      navigate('/driver/profile-setup');
      return;
    }
    
    setSession(JSON.parse(profileData));
    
    // Get user location if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Use mock location for demo
          setLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // Use mock location for demo
      setLocation({ lat: 37.7749, lng: -122.4194 });
    }

    // Update location every 10 seconds during trip
    const interval = setInterval(() => {
      if (isOnTrip && location) {
        setLocation(prev => prev ? {
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        } : null);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [navigate, isOnTrip, location]);

  const handleStartTrip = () => {
    setIsOnTrip(true);
    setTripStartTime(new Date());
    toast.success("Trip started! Your location is now being tracked.");
  };

  const handleStopTrip = () => {
    setIsOnTrip(false);
    setTripStartTime(null);
    toast.success("Trip ended. Thanks for your service!");
  };

  const handleOccupancyChange = (newOccupancy: 'low' | 'medium' | 'full') => {
    setOccupancy(newOccupancy);
    toast.success(`Occupancy updated to ${newOccupancy}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('driver-profile');
    navigate('/');
    toast.success("Logged out successfully");
  };

  if (!session) return null;

  const formatDuration = (start: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    return diff < 60 ? `${diff}m` : `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Driver Dashboard</h1>
                <Badge variant="secondary" className="capitalize">
                  {session.city}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Welcome, {session.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trip Control */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-primary" />
              Trip Control
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div>
                  <div className="font-medium">Status</div>
                  <div className="text-sm text-muted-foreground">
                    {isOnTrip ? 'On Trip' : 'Off Duty'}
                  </div>
                </div>
                <Badge 
                  variant={isOnTrip ? "default" : "secondary"}
                  className={isOnTrip ? "bg-train" : ""}
                >
                  {isOnTrip ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {tripStartTime && (
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium">Trip Duration</div>
                    <div className="text-sm text-muted-foreground">
                      Started {tripStartTime.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="font-bold text-primary">
                    {formatDuration(tripStartTime)}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {!isOnTrip ? (
                  <Button onClick={handleStartTrip} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Trip
                  </Button>
                ) : (
                  <Button onClick={handleStopTrip} variant="destructive" className="flex-1">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Trip
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Vehicle Info */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Vehicle Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-sm">Vehicle ID</div>
                  <div className="text-lg font-bold">{session.vehicleId}</div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-sm">Type</div>
                  <div className="text-lg font-bold capitalize">{session.vehicleType}</div>
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <div className="font-medium mb-2">Route</div>
                <div className="text-lg font-bold">{session.routeId}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {session.city} • {session.vehicleType}
                </div>
              </div>

              {location && (
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="font-medium mb-2">Current Location</div>
                  <div className="text-sm font-mono">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {isOnTrip ? 'Location updating...' : 'Location tracking paused'}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Occupancy Control */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Occupancy Level
            </h2>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Current Level</div>
                <div className={`text-2xl font-bold capitalize ${
                  occupancy === 'low' ? 'text-train' : 
                  occupancy === 'medium' ? 'text-bus' : 'text-destructive'
                }`}>
                  {occupancy}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={occupancy === 'low' ? 'default' : 'outline'}
                  onClick={() => handleOccupancyChange('low')}
                  className={occupancy === 'low' ? 'bg-train hover:bg-train/90' : ''}
                >
                  Low
                </Button>
                <Button
                  variant={occupancy === 'medium' ? 'default' : 'outline'}
                  onClick={() => handleOccupancyChange('medium')}
                  className={occupancy === 'medium' ? 'bg-bus hover:bg-bus/90' : ''}
                >
                  Medium
                </Button>
                <Button
                  variant={occupancy === 'full' ? 'default' : 'outline'}
                  onClick={() => handleOccupancyChange('full')}
                  className={occupancy === 'full' ? 'bg-destructive hover:bg-destructive/90' : ''}
                >
                  Full
                </Button>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Today's Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Trips Completed</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">8.2h</div>
                <div className="text-sm text-muted-foreground">Total Drive Time</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">247</div>
                <div className="text-sm text-muted-foreground">Passengers Served</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;