import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Car, MapPin, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CITIES, City, TransportMode } from "@/types";
import { getRouteOptions } from "@/data/mockData";
import { toast } from "sonner";

const driverProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  vehicleType: z.enum(['bus', 'metro', 'train']),
  city: z.enum(['mumbai', 'bangalore', 'delhi']),
  routeId: z.string().min(1, "Please select a route")
});

type DriverProfileForm = z.infer<typeof driverProfileSchema>;

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<'bus' | 'metro' | 'train' | null>(null);

  const form = useForm<DriverProfileForm>({
    resolver: zodResolver(driverProfileSchema),
    defaultValues: {
      name: "",
      vehicleType: undefined,
      city: undefined,
      routeId: ""
    }
  });

  const onSubmit = (data: DriverProfileForm) => {
    const driverProfile = {
      ...data,
      vehicleId: `${data.vehicleType}-${data.city}-${Math.floor(Math.random() * 1000)}`
    };
    
    localStorage.setItem('driver-profile', JSON.stringify(driverProfile));
    toast.success("Profile created successfully!");
    navigate('/driver/dashboard');
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    form.setValue('city', city);
    form.setValue('routeId', ''); // Reset route when city changes
  };

  const handleVehicleTypeChange = (type: 'bus' | 'metro' | 'train') => {
    setSelectedVehicleType(type);
    form.setValue('vehicleType', type);
    form.setValue('routeId', ''); // Reset route when vehicle type changes
  };

  const availableRoutes = selectedCity && selectedVehicleType 
    ? getRouteOptions(selectedCity, selectedVehicleType as TransportMode)
    : [];

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
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
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Driver Profile Setup
          </h1>
          <p className="text-lg text-muted-foreground">
            Set up your driver profile to start your journey
          </p>
        </div>

        <Card className="p-6 bg-card shadow-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Driver Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      City
                    </FormLabel>
                    <Select onValueChange={handleCityChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CITIES).map(([key, city]) => (
                          <SelectItem key={key} value={key}>
                            {city.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      Vehicle Type
                    </FormLabel>
                    <Select onValueChange={handleVehicleTypeChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="metro">Metro</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Route className="w-4 h-4 mr-2" />
                      Route
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedCity || !selectedVehicleType}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            !selectedCity || !selectedVehicleType 
                              ? "Select city and vehicle type first" 
                              : "Select your route"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableRoutes.map((route) => (
                          <SelectItem key={route} value={route}>
                            {route}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Profile & Start
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;