import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Zap, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DriverLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLogging(true);
    
    // Mock login with delay
    setTimeout(() => {
      // Store mock driver session
      localStorage.setItem('driver-session', JSON.stringify({
        username,
        loginTime: new Date().toISOString(),
        vehicleId: `${username.toUpperCase()}-001`,
        vehicleType: 'bus'
      }));
      
      toast.success("Login successful!");
      navigate('/driver/dashboard');
      setIsLogging(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="w-16 h-16 mx-auto bg-bus/10 rounded-full flex items-center justify-center shadow-card mb-4">
            <Zap className="w-8 h-8 text-bus" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Driver Login</h1>
          <p className="text-muted-foreground">Access your driver dashboard</p>
        </div>

        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              disabled={isLogging}
              className="w-full"
            >
              {isLogging ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-medium mb-2 text-sm">Demo Credentials</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Username: <span className="font-mono">driver1</span></p>
              <p>Password: <span className="font-mono">demo123</span></p>
              <p className="text-[10px] mt-2">Any credentials will work in demo mode</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;