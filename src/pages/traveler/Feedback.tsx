import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Feedback = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [issueType, setIssueType] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!route || !issueType || !comments) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock local storage save
    const feedback = {
      id: Date.now(),
      route,
      issueType,
      comments,
      timestamp: new Date().toISOString(),
    };

    const existingFeedback = JSON.parse(localStorage.getItem('traveler-feedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('traveler-feedback', JSON.stringify(existingFeedback));

    setIsSubmitted(true);
    toast.success("Feedback submitted successfully!");
  };

  const handleReset = () => {
    setRoute("");
    setIssueType("");
    setComments("");
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/traveler')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Feedback</h1>
            <p className="text-sm text-muted-foreground">Help us improve your transit experience</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {!isSubmitted ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              Submit Feedback
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="route">Route/Vehicle</Label>
                <Input
                  id="route"
                  placeholder="e.g., Bus Route 101, Metro Blue Line"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delay">Delay/Late Arrival</SelectItem>
                    <SelectItem value="overcrowding">Overcrowding</SelectItem>
                    <SelectItem value="cleanliness">Cleanliness Issues</SelectItem>
                    <SelectItem value="safety">Safety Concerns</SelectItem>
                    <SelectItem value="accessibility">Accessibility Issues</SelectItem>
                    <SelectItem value="staff">Staff Behavior</SelectItem>
                    <SelectItem value="app">App/System Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Please describe the issue in detail..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
              </div>
              
              <Button onClick={handleSubmit} className="w-full">
                Submit Feedback
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 mx-auto text-train" />
            </div>
            <h2 className="text-xl font-bold mb-2">Feedback Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your feedback. Your input helps us improve the transit system for everyone.
              <br />
              <span className="text-xs">(Demo mode - feedback saved locally)</span>
            </p>
            <div className="space-y-2">
              <Button onClick={handleReset} className="mr-2">
                Submit Another
              </Button>
              <Button variant="outline" onClick={() => navigate('/traveler')}>
                Back to Map
              </Button>
            </div>
          </Card>
        )}

        {/* Recent Feedback */}
        {!isSubmitted && (
          <Card className="p-6 mt-6">
            <h3 className="font-bold mb-4">Recent Feedback</h3>
            <div className="space-y-3">
              {JSON.parse(localStorage.getItem('traveler-feedback') || '[]')
                .slice(-3)
                .reverse()
                .map((feedback: any) => (
                  <div key={feedback.id} className="bg-secondary/30 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{feedback.route}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(feedback.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1 capitalize">
                      {feedback.issueType.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-sm">{feedback.comments}</div>
                  </div>
                ))}
              {JSON.parse(localStorage.getItem('traveler-feedback') || '[]').length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No feedback submitted yet
                </p>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Feedback;