import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <MapPin className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Cirkle
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart transit tracking platform connecting travelers, drivers, and authorities in real-time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => navigate('/traveler/city-select')}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I'm a Traveler</h3>
              <p className="text-muted-foreground mb-4">
                Track buses, trains, and metro in real-time. Plan your routes efficiently.
              </p>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => navigate('/driver/profile-setup')}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-bus/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-bus/20 transition-colors">
                <Zap className="w-8 h-8 text-bus" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I'm a Driver/Operator</h3>
              <p className="text-muted-foreground mb-4">
                Update your location, manage occupancy levels, and communicate with passengers.
              </p>
              <Button className="w-full" variant="outline">
                Driver Setup
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => navigate('/authority/login')}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-train/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-train/20 transition-colors">
                <Shield className="w-8 h-8 text-train" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authority Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Monitor fleet status, analyze traffic patterns, and generate reports.
              </p>
              <Button className="w-full" variant="outline">
                Admin Access
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-bus rounded-full mr-2"></div>
              Bus
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-metro rounded-full mr-2"></div>
              Metro
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-train rounded-full mr-2"></div>
              Train
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-monorail rounded-full mr-2"></div>
              Monorail
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;