import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CITIES, City } from "@/types";

const CitySelect = () => {
  const navigate = useNavigate();

  const handleCitySelect = (city: City) => {
    localStorage.setItem('selected-city', city);
    navigate('/traveler/transport-select');
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Select Your City
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your city to see real-time transit information
          </p>
        </div>

        <div className="grid gap-4">
          {Object.entries(CITIES).map(([key, city]) => (
            <Card 
              key={key}
              className="p-6 bg-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
              onClick={() => handleCitySelect(key as City)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{city.displayName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Lat: {city.coordinates[0]}, Lng: {city.coordinates[1]}
                  </p>
                </div>
                <div className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelect;