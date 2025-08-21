import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreditScoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CreditScoreData {
  score: number;
  band: string;
  advice: string;
}

const CreditScoreModal = ({ open, onOpenChange }: CreditScoreModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pan: ""
  });
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creditScore, setCreditScore] = useState<CreditScoreData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.pan || !consent) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and provide consent.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to credit score service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock credit score response
      const mockScore = {
        score: Math.floor(Math.random() * 200) + 650, // Random score between 650-850
        band: "",
        advice: ""
      };
      
      // Determine band and advice based on score
      if (mockScore.score >= 750) {
        mockScore.band = "Excellent";
        mockScore.advice = "Great credit score! You qualify for the best interest rates and loan terms.";
      } else if (mockScore.score >= 700) {
        mockScore.band = "Good";
        mockScore.advice = "Good credit score. You qualify for competitive rates with most lenders.";
      } else if (mockScore.score >= 650) {
        mockScore.band = "Fair";
        mockScore.advice = "Fair credit score. Consider improving by paying bills on time and reducing credit utilization.";
      } else {
        mockScore.band = "Poor";
        mockScore.advice = "Lower credit score. Consider a co-applicant or work on improving your credit history.";
      }
      
      setCreditScore(mockScore);
      
      toast({
        title: "Credit Score Retrieved!",
        description: "Your credit score has been successfully fetched.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve credit score. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after a delay to allow modal close animation
    setTimeout(() => {
      setFormData({ name: "", mobile: "", pan: "" });
      setConsent(false);
      setCreditScore(null);
    }, 300);
  };

  const getBandColor = (band: string) => {
    switch (band) {
      case "Excellent": return "text-success";
      case "Good": return "text-primary";
      case "Fair": return "text-amber-500";
      case "Poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getBandIcon = (band: string) => {
    switch (band) {
      case "Excellent": 
      case "Good": 
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "Fair": 
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      case "Poor": 
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default: 
        return <TrendingUp className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>Check Credit Score - Free</span>
          </DialogTitle>
        </DialogHeader>

        {!creditScore ? (
          /* Form View */
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-2xl">
              <p className="text-sm text-muted-foreground">
                Get your credit score instantly with a soft pull that won't affect your credit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="Enter mobile number"
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>PAN Number</Label>
                <Input
                  value={formData.pan}
                  onChange={(e) => setFormData(prev => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                  placeholder="Enter PAN number"
                  className="rounded-2xl"
                />
              </div>

              <div className="flex items-start space-x-2 py-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I consent to a soft credit check and sharing my details with partner lenders. 
                  I understand this will not affect my credit score.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Fetching Score..." : "Get My Credit Score"}
              </Button>
            </form>

            <div className="text-xs text-center text-muted-foreground">
              <Shield className="inline h-4 w-4 mr-1" />
              This was a soft pull and will not affect your credit score
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6">
            <Card className="p-6 text-center space-y-4 shadow-card rounded-3xl">
              <div className="space-y-2">
                <div className="text-6xl font-bold text-primary">
                  {creditScore.score}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {getBandIcon(creditScore.band)}
                  <span className={`text-xl font-semibold ${getBandColor(creditScore.band)}`}>
                    {creditScore.band}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">Out of 900</p>
              </div>
            </Card>

            <Card className="p-6 space-y-4 rounded-3xl bg-muted/30">
              <h4 className="font-semibold flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recommendations</span>
              </h4>
              <p className="text-muted-foreground">
                {creditScore.advice}
              </p>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleClose}
                className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90"
              >
                Apply for Loan Now
              </Button>
              
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full rounded-2xl h-12"
              >
                Close
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground bg-muted/30 p-3 rounded-2xl">
              <Shield className="inline h-4 w-4 mr-1" />
              This was a soft pull and did not affect your credit score. 
              Results saved to your profile for faster loan processing.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreditScoreModal;