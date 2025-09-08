import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EMIData {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

const EMICalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 500000,
    interestRate: 12,
    tenure: 3
  });
  const { toast } = useToast();

  const calculateEMI = useCallback((): EMIData => {
    const { loanAmount, interestRate, tenure } = formData;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    
    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - loanAmount;

    return {
      loanAmount,
      interestRate,
      tenure,
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  }, [formData]);

  const emiData = calculateEMI();

  const handleSaveScenario = () => {
    toast({
      title: "Scenario Saved!",
      description: "Your EMI calculation has been saved. We'll include this in your loan application.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-primary">EMI Calculator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly EMI and plan your budget with our interactive calculator
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Calculator Controls */}
            <Card className="p-8 shadow-card rounded-3xl">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold">Loan Details</h3>
                </div>

                {/* Loan Amount */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Loan Amount</Label>
                  <Input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      loanAmount: parseInt(e.target.value) || 0
                    }))}
                    className="h-12 rounded-2xl text-lg"
                  />
                  <Slider
                    value={[formData.loanAmount]}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      loanAmount: value[0]
                    }))}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Interest Rate (% p.a.)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.interestRate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      interestRate: parseFloat(e.target.value) || 0
                    }))}
                    className="h-12 rounded-2xl text-lg"
                  />
                  <Slider
                    value={[formData.interestRate]}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      interestRate: value[0]
                    }))}
                    min={8}
                    max={20}
                    step={0.1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>8%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Loan Tenure (Years)</Label>
                  <Input
                    type="number"
                    value={formData.tenure}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      tenure: parseInt(e.target.value) || 0
                    }))}
                    className="h-12 rounded-2xl text-lg"
                  />
                  <Slider
                    value={[formData.tenure]}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      tenure: value[0]
                    }))}
                    min={1}
                    max={25}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 Year</span>
                    <span>25 Years</span>
                  </div>
                </div>

                <Button
                  onClick={handleSaveScenario}
                  className="w-full h-12 rounded-2xl bg-accent hover:bg-accent/90"
                >
                  Save This Scenario
                </Button>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              
              {/* Monthly EMI */}
              <Card className="p-8 shadow-card rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-lg">Monthly EMI</p>
                    <p className="text-4xl font-bold">{formatCurrency(emiData.emi)}</p>
                  </div>
                  <IndianRupee className="h-12 w-12 text-accent" />
                </div>
              </Card>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 shadow-card rounded-3xl">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(emiData.totalAmount)}
                    </p>
                  </div>
                </Card>

                <Card className="p-6 shadow-card rounded-3xl">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Total Interest</p>
                    <p className="text-2xl font-bold text-accent">
                      {formatCurrency(emiData.totalInterest)}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Breakdown Chart Placeholder */}
              <Card className="p-8 shadow-card rounded-3xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <h4 className="text-xl font-semibold">Loan Breakdown</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Principal Amount</span>
                      <span className="font-semibold">{formatCurrency(emiData.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Interest Amount</span>
                      <span className="font-semibold text-accent">{formatCurrency(emiData.totalInterest)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Payable</span>
                      <span className="font-bold text-primary">{formatCurrency(emiData.totalAmount)}</span>
                    </div>
                  </div>
                  
                  {/* Visual Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ 
                          width: `${(emiData.loanAmount / emiData.totalAmount) * 100}%` 
                        }}
                      />
                      <div 
                        className="h-full bg-accent -mt-4 rounded-full"
                        style={{ 
                          width: `${(emiData.totalInterest / emiData.totalAmount) * 100}%`,
                          marginLeft: `${(emiData.loanAmount / emiData.totalAmount) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">● Principal</span>
                      <span className="text-accent">● Interest</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;