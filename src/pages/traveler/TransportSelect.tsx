import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bus, Train, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CITIES, City, TransportMode } from "@/types";

const TransportSelect = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    const city = localStorage.getItem('selected-city') as City;
    if (!city || !CITIES[city]) {
      navigate('/traveler/city-select');
      return;
    }
    setSelectedCity(city);
  }, [navigate]);

  const handleTransportSelect = (mode: TransportMode) => {
    localStorage.setItem('selected-transport', mode);
    navigate('/traveler');
  };

  const transportModes = [
    {
      key: 'bus' as TransportMode,
      name: 'Bus',
      icon: Bus,
      description: 'City buses with real-time tracking',
      color: 'bus'
    },
    {
      key: 'metro' as TransportMode,
      name: 'Metro',
      icon: Navigation,
      description: 'Metro lines and train arrivals',
      color: 'metro'
    },
    {
      key: 'train' as TransportMode,
      name: 'Local Train',
      icon: Train,
      description: 'Local trains and railway services',
      color: 'train'
    }
  ];

  if (!selectedCity) return null;

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/traveler/city-select')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to City Selection
          </Button>
          
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Navigation className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Choose Transport Mode
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {CITIES[selectedCity].displayName}
          </p>
          <p className="text-sm text-muted-foreground">
            Select your preferred mode of transport
          </p>
        </div>

        <div className="grid gap-4">
          {transportModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <Card 
                key={mode.key}
                className="p-6 bg-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => handleTransportSelect(mode.key)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${mode.color}/10 rounded-full flex items-center justify-center group-hover:bg-${mode.color}/20 transition-colors`}>
                    <IconComponent className={`w-6 h-6 text-${mode.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{mode.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mode.description}
                    </p>
                  </div>
                  <div className="text-primary group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransportSelect;