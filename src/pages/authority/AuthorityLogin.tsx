import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthorityLogin = () => {
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
      // Store mock authority session
      localStorage.setItem('authority-session', JSON.stringify({
        username,
        loginTime: new Date().toISOString(),
        role: 'administrator',
        permissions: ['view_all', 'generate_reports', 'manage_fleet']
      }));
      
      toast.success("Login successful!");
      navigate('/authority/dashboard');
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
          
          <div className="w-16 h-16 mx-auto bg-train/10 rounded-full flex items-center justify-center shadow-card mb-4">
            <Shield className="w-8 h-8 text-train" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Authority Access</h1>
          <p className="text-muted-foreground">Administrative dashboard login</p>
        </div>

        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter admin username"
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
                placeholder="Enter admin password"
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
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Access Dashboard
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-medium mb-2 text-sm">Demo Credentials</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Username: <span className="font-mono">admin</span></p>
              <p>Password: <span className="font-mono">secure123</span></p>
              <p className="text-[10px] mt-2">Any credentials will work in demo mode</p>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <div className="text-xs text-muted-foreground">
            Secure access for transit authorities and administrators
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityLogin;