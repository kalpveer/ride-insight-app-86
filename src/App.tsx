import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CitySelect from "./pages/traveler/CitySelect";
import TransportSelect from "./pages/traveler/TransportSelect";
import TravelerHome from "./pages/traveler/TravelerHome";
import RoutePlanner from "./pages/traveler/RoutePlanner";
import Feedback from "./pages/traveler/Feedback";
import ProfileSetup from "./pages/driver/ProfileSetup";
import DriverLogin from "./pages/driver/DriverLogin";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AuthorityLogin from "./pages/authority/AuthorityLogin";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Traveler Routes */}
          <Route path="/traveler/city-select" element={<CitySelect />} />
          <Route path="/traveler/transport-select" element={<TransportSelect />} />
          <Route path="/traveler" element={<TravelerHome />} />
          <Route path="/traveler/route-planner" element={<RoutePlanner />} />
          <Route path="/traveler/feedback" element={<Feedback />} />
          
          {/* Driver Routes */}
          <Route path="/driver/profile-setup" element={<ProfileSetup />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          
          {/* Authority Routes */}
          <Route path="/authority/login" element={<AuthorityLogin />} />
          <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
