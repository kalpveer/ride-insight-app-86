import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, BarChart3, MapPin, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TransitMap from "@/components/TransitMap";
import { Vehicle } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AuthoritySession {
  username: string;
  loginTime: string;
  role: string;
  permissions: string[];
}

const AuthorityDashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<AuthoritySession | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Mock data for charts
  const vehicleActivityData = [
    { mode: 'Bus', active: 45, total: 60 },
    { mode: 'Metro', active: 18, total: 20 },
    { mode: 'Train', active: 12, total: 15 },
    { mode: 'Monorail', active: 8, total: 10 },
  ];

  const occupancyData = [
    { name: 'Low', value: 35, color: '#10b981' },
    { name: 'Medium', value: 40, color: '#f59e0b' },
    { name: 'Full', value: 25, color: '#ef4444' },
  ];

  useEffect(() => {
    const sessionData = localStorage.getItem('authority-session');
    if (!sessionData) {
      navigate('/authority/login');
      return;
    }
    
    setSession(JSON.parse(sessionData));

    // Generate mock fleet data
    const generateFleetData = (): Vehicle[] => {
      const fleetData: Vehicle[] = [];
      
      // Generate buses
      for (let i = 1; i <= 45; i++) {
        fleetData.push({
          id: `bus-${i}`,
          type: 'bus',
          route: `Route ${100 + i}`,
          lat: 37.7749 + (Math.random() - 0.5) * 0.1,
          lng: -122.4194 + (Math.random() - 0.5) * 0.1,
          occupancy: ['low', 'medium', 'full'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'full',
          eta: `${Math.floor(Math.random() * 15) + 1} min`,
          city: 'mumbai' as const
        });
      }

      // Generate metro
      for (let i = 1; i <= 18; i++) {
        fleetData.push({
          id: `metro-${i}`,
          type: 'metro',
          route: `Line ${i}`,
          lat: 37.7749 + (Math.random() - 0.5) * 0.08,
          lng: -122.4194 + (Math.random() - 0.5) * 0.08,
          occupancy: ['low', 'medium', 'full'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'full',
          eta: `${Math.floor(Math.random() * 10) + 1} min`,
          city: 'bangalore' as const
        });
      }

      // Generate trains
      for (let i = 1; i <= 12; i++) {
        fleetData.push({
          id: `train-${i}`,
          type: 'train',
          route: `Express ${i}`,
          lat: 37.7749 + (Math.random() - 0.5) * 0.12,
          lng: -122.4194 + (Math.random() - 0.5) * 0.12,
          occupancy: ['low', 'medium', 'full'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'full',
          eta: `${Math.floor(Math.random() * 8) + 1} min`,
          city: 'delhi' as const
        });
      }

      // Generate monorails
      for (let i = 1; i <= 8; i++) {
        fleetData.push({
          id: `monorail-${i}`,
          type: 'monorail',
          route: `Sky ${i}`,
          lat: 37.7749 + (Math.random() - 0.5) * 0.06,
          lng: -122.4194 + (Math.random() - 0.5) * 0.06,
          occupancy: ['low', 'medium', 'full'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'full',
          eta: `${Math.floor(Math.random() * 12) + 1} min`,
          city: 'mumbai' as const
        });
      }

      return fleetData;
    };

    setVehicles(generateFleetData());

    // Update vehicle positions every 10 seconds
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        lat: vehicle.lat + (Math.random() - 0.5) * 0.001,
        lng: vehicle.lng + (Math.random() - 0.5) * 0.001,
        eta: `${Math.floor(Math.random() * 15) + 1} min`
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleDownloadReport = () => {
    const csvContent = [
      ['Vehicle ID', 'Type', 'Route', 'Occupancy', 'Last Location', 'Status'],
      ...vehicles.map(v => [
        v.id,
        v.type,
        v.route,
        v.occupancy,
        `${v.lat.toFixed(6)}, ${v.lng.toFixed(6)}`,
        'Active'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleet-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success("Fleet report downloaded successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem('authority-session');
    navigate('/');
    toast.success("Logged out successfully");
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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
              <h1 className="text-2xl font-bold">Authority Dashboard</h1>
              <p className="text-sm text-muted-foreground">Fleet Management & Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleDownloadReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <div className="text-sm text-muted-foreground">Active Vehicles</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-train" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-muted-foreground">Current Passengers</div>
          </Card>
          <Card className="p-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-bus" />
            <div className="text-2xl font-bold">32</div>
            <div className="text-sm text-muted-foreground">Active Routes</div>
          </Card>
          <Card className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-monorail" />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">System Efficiency</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Fleet Map */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">Fleet Overview Map</h2>
              <TransitMap 
                vehicles={vehicles}
                onVehicleSelect={setSelectedVehicle}
                className="h-96"
              />
            </Card>
          </div>

          {/* Vehicle Activity Chart */}
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Vehicle Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mode" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="hsl(217 91% 60%)" />
                <Bar dataKey="total" fill="hsl(220 15% 15%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Fleet Table */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">Fleet Status</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Vehicle ID</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Route</th>
                      <th className="text-left p-2">Occupancy</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.slice(0, 10).map((vehicle) => (
                      <tr key={vehicle.id} className="border-b border-border/50">
                        <td className="p-2 font-mono">{vehicle.id}</td>
                        <td className="p-2 capitalize">{vehicle.type}</td>
                        <td className="p-2">{vehicle.route}</td>
                        <td className="p-2">
                          <Badge 
                            variant="outline"
                            className={
                              vehicle.occupancy === 'low' ? 'text-train border-train' :
                              vehicle.occupancy === 'medium' ? 'text-bus border-bus' :
                              'text-destructive border-destructive'
                            }
                          >
                            {vehicle.occupancy}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-train border-train">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Occupancy Distribution */}
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Occupancy Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4 text-xs">
              {occupancyData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;