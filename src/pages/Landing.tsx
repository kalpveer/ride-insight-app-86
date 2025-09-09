import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-semibold mb-6 text-foreground tracking-tight">
            Cirkle
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Smart transit tracking platform connecting travelers, drivers, and authorities in real-time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/traveler/city-select')}>
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-3 text-foreground">Traveler</h3>
              <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                Track buses, trains, and metro in real-time. Plan your routes efficiently.
              </p>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/driver/profile-setup')}>
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-3 text-foreground">Driver</h3>
              <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                Update your location, manage occupancy levels, and communicate with passengers.
              </p>
              <Button className="w-full" variant="outline">
                Driver Setup
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/authority/login')}>
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-3 text-foreground">Authority</h3>
              <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                Monitor fleet status, analyze traffic patterns, and generate reports.
              </p>
              <Button className="w-full" variant="outline">
                Admin Access
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-card border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/student/college-tracker')}>
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-3 text-foreground">Student</h3>
              <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                Track your college or school bus in real-time and set reminders.
              </p>
              <Button className="w-full" variant="outline">
                Track Bus
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground font-light">
            <span>Bus</span>
            <span>•</span>
            <span>Metro</span>
            <span>•</span>
            <span>Train</span>
            <span>•</span>
            <span>Monorail</span>
          </div>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-muted-foreground font-light">Team commanders</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;