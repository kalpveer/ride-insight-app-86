import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Clock, Leaf, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RouteResult {
  totalTime: string;
  co2Saved: string;
  segments: {
    mode: 'bus' | 'metro' | 'train' | 'monorail' | 'walk';
    route: string;
    duration: string;
    color: string;
  }[];
}

const RoutePlanner = () => {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  const handlePlanRoute = async () => {
    if (!startLocation || !destination) return;
    
    setIsPlanning(true);
    
    // Mock route planning with realistic delay
    setTimeout(() => {
      const mockResult: RouteResult = {
        totalTime: "42 min",
        co2Saved: "2.3 kg",
        segments: [
          { mode: 'walk', route: 'Walk to Bus Stop', duration: '5 min', color: '#6b7280' },
          { mode: 'bus', route: 'Route 101', duration: '18 min', color: 'hsl(25 95% 53%)' },
          { mode: 'walk', route: 'Transfer', duration: '3 min', color: '#6b7280' },
          { mode: 'metro', route: 'Blue Line', duration: '12 min', color: 'hsl(217 91% 60%)' },
          { mode: 'walk', route: 'Walk to Destination', duration: '4 min', color: '#6b7280' },
        ]
      };
      
      setRouteResult(mockResult);
      setIsPlanning(false);
    }, 2000);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'walk': return '🚶';
      case 'bus': return '🚌';
      case 'metro': return '🚇';
      case 'train': return '🚂';
      case 'monorail': return '🚝';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/traveler')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Route Planner</h1>
            <p className="text-sm text-muted-foreground">Plan your multi-modal journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Route Input */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-primary" />
              Plan Your Journey
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="start">From</Label>
                <Input
                  id="start"
                  placeholder="Enter starting location"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="destination">To</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handlePlanRoute}
                disabled={!startLocation || !destination || isPlanning}
                className="w-full"
              >
                {isPlanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Planning Route...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Plan Route
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Route Results */}
          {routeResult && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recommended Route</h2>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/50 p-4 rounded-lg text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-lg">{routeResult.totalTime}</div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
                <div className="bg-train/10 p-4 rounded-lg text-center">
                  <Leaf className="w-6 h-6 mx-auto mb-2 text-train" />
                  <div className="font-bold text-lg">{routeResult.co2Saved}</div>
                  <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                </div>
              </div>

              {/* Route Segments */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Journey Steps
                </h3>
                {routeResult.segments.map((segment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl">{getModeIcon(segment.mode)}</div>
                    <div className="flex-1">
                      <div className="font-medium">{segment.route}</div>
                      <div className="text-sm text-muted-foreground">{segment.duration}</div>
                    </div>
                    <div 
                      className="w-3 h-8 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Save Route
              </Button>
            </Card>
          )}

          {/* Quick Tips */}
          {!routeResult && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Planning Tips</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Enter specific addresses or landmark names for best results</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Routes combine multiple transport modes for optimal travel time</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Real-time occupancy data helps you avoid crowded vehicles</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Environmental impact shows your contribution to sustainability</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;