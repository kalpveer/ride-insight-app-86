import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollegeTracker = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for college buses
  const collegeBuses = [
    {
      id: "CB-001",
      route: "Main Campus - Hostel Block A",
      currentLocation: "Near Library Building",
      eta: "5 min",
      occupancy: "Medium",
      status: "On Time",
      nextStops: ["Cafeteria", "Hostel Block A"]
    },
    {
      id: "CB-002", 
      route: "Engineering Block - Metro Station",
      currentLocation: "Engineering Block",
      eta: "12 min",
      occupancy: "High",
      status: "Delayed",
      nextStops: ["Admin Block", "Main Gate", "Metro Station"]
    },
    {
      id: "CB-003",
      route: "Hostel Block B - Medical Center",
      currentLocation: "Sports Complex",
      eta: "8 min",
      occupancy: "Low",
      status: "On Time",
      nextStops: ["Canteen", "Medical Center"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time": return "bg-train";
      case "Delayed": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case "Low": return "text-train";
      case "Medium": return "text-bus";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const filteredBuses = collegeBuses.filter(bus =>
    bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h1 className="text-4xl font-semibold mb-2 text-foreground">
            College Bus Tracker
          </h1>
          <p className="text-muted-foreground font-light">
            Track your college buses in real-time and never miss a ride
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by route or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bus Cards */}
        <div className="grid gap-4">
          {filteredBuses.map((bus) => (
            <Card key={bus.id} className="p-6 bg-card border border-border hover:border-primary/20 transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {bus.route}
                  </h3>
                  <p className="text-sm text-muted-foreground">Bus ID: {bus.id}</p>
                </div>
                <Badge className={`${getStatusColor(bus.status)} text-white`}>
                  {bus.status}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium text-foreground">{bus.currentLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                      <p className="font-medium text-foreground">{bus.eta}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Occupancy</p>
                      <p className={`font-medium ${getOccupancyColor(bus.occupancy)}`}>
                        {bus.occupancy}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Next Stops</p>
                  <div className="space-y-2">
                    {bus.nextStops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-foreground">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="w-full md:w-auto">
                  Set Reminder
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No buses found matching your search.</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-card border border-border text-center">
            <h4 className="font-medium text-foreground mb-2">Bus Schedule</h4>
            <p className="text-sm text-muted-foreground">View complete timetable</p>
          </Card>
          <Card className="p-4 bg-card border border-border text-center">
            <h4 className="font-medium text-foreground mb-2">Route Map</h4>
            <p className="text-sm text-muted-foreground">See all bus routes</p>
          </Card>
          <Card className="p-4 bg-card border border-border text-center">
            <h4 className="font-medium text-foreground mb-2">Notifications</h4>
            <p className="text-sm text-muted-foreground">Set bus alerts</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeTracker;