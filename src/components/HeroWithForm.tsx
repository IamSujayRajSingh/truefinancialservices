import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-car-family.jpg";

interface QuickFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  pincode: string;
  occupation: string;
  monthlyIncome: string;
  desiredLoanAmount: string;
}

const HeroWithForm = () => {
  const [formData, setFormData] = useState<QuickFormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    occupation: "",
    monthlyIncome: "",
    desiredLoanAmount: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.pincode || !formData.occupation || !formData.monthlyIncome || !formData.desiredLoanAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert({
          full_name: formData.name,
          email: formData.email,
          mobile_number: formData.phone,
          city: formData.city,
          pincode: formData.pincode,
          employment_type: 'salaried' as const,
          monthly_income: parseFloat(formData.monthlyIncome),
          desired_loan_amount: parseFloat(formData.desiredLoanAmount),
          consent_given: true,
          status: 'new' as const
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "We'll contact you within 30 minutes with pre-approved offers.",
      });
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        city: "", 
        pincode: "", 
        occupation: "", 
        monthlyIncome: "", 
        desiredLoanAmount: "" 
      });
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof QuickFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Get Your Dream Car
                <span className="text-accent block">Loan in Minutes</span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Fast, transparent used-car loans with instant pre-approval, 
                low EMIs, and multiple lender options. No hidden fees.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="text-white/90">Instant Pre-approval</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-accent" />
                <span className="text-white/90">60-Second Process</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-accent" />
                <span className="text-white/90">100% Secure</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-accent" />
                <span className="text-white/90">Multiple Lenders</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md p-8 shadow-floating glass-card border-white/20">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold text-primary">
                    Check Eligibility
                  </h3>
                  <p className="text-muted-foreground">
                    Get instant pre-approval in 60 seconds
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Monthly Income"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Desired Loan Amount"
                      type="number"
                      value={formData.desiredLoanAmount}
                      onChange={(e) => handleInputChange("desiredLoanAmount", e.target.value)}
                      className="h-12 rounded-2xl border-white/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg shadow-card"
                  >
                    {isLoading ? "Checking..." : "Check My Eligibility"}
                  </Button>
                </form>

                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-primary underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Hero Image Overlay */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
        <img
          src={heroImage}
          alt="Happy family with their car"
          className="w-full h-full object-cover rounded-tl-3xl"
        />
      </div>
    </section>
  );
};

export default HeroWithForm;