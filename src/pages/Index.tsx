import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Car, Shield, Users, CheckCircle, TrendingUp } from "lucide-react";
import HeroWithForm from "@/components/HeroWithForm";
import EMICalculator from "@/components/EMICalculator";
import CreditScoreModal from "@/components/CreditScoreModal";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import tfsLogo from "@/assets/tfs-logo.png";

const Index = () => {
  const [showCreditModal, setShowCreditModal] = useState(false);

  const benefits = [
    {
      icon: CheckCircle,
      title: "Instant Pre-Approval",
      description: "Get approved in minutes with our AI-powered eligibility check"
    },
    {
      icon: TrendingUp,
      title: "Low Interest Rates",
      description: "Competitive rates starting from 10.5% with flexible EMI options"
    },
    {
      icon: Users,
      title: "Multiple Lenders",
      description: "Access to 15+ top lenders for the best loan offers"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Bank-grade security with complete data protection"
    }
  ];

  const lenders = [
    "HDFC Bank", "ICICI Bank", "SBI", "Kotak Mahindra", "Bajaj Finserv", "Tata Capital"
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={tfsLogo} alt="TFS Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold text-white">TFS</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/services/used-car-loan" className="text-white/90 hover:text-white">
                Services
              </Link>
              <Link to="/emi-calculator" className="text-white/90 hover:text-white">
                EMI Calculator
              </Link>
              <Link to="/about" className="text-white/90 hover:text-white">
                About
              </Link>
              <Link to="/contact" className="text-white/90 hover:text-white">
                Contact
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowCreditModal(true)}
                variant="outline"
                className="rounded-2xl border-white/30 text-white hover:bg-white/10"
              >
                Credit Score
              </Button>
              <Button
                asChild
                className="rounded-2xl bg-accent hover:bg-accent/90"
              >
                <Link to="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <HeroWithForm />

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-primary">Why Choose TFS?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast, transparent, and reliable car loans designed for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center space-y-6 shadow-card rounded-3xl hover:shadow-floating transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <EMICalculator />

      {/* Lenders Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-primary">Our Lending Partners</h2>
            <p className="text-lg text-muted-foreground">
              We work with India's most trusted financial institutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {lenders.map((lender, index) => (
              <Card key={index} className="p-6 text-center shadow-card rounded-2xl hover:shadow-floating transition-all duration-300">
                <p className="font-semibold text-muted-foreground">{lender}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8 text-white">
            <h2 className="text-4xl font-bold">
              Ready to Get Your Car Loan?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of satisfied customers who got their dream cars with TFS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="rounded-2xl bg-white text-primary hover:bg-white/90 px-8 py-4"
              >
                <Link to="/apply">Start Application</Link>
              </Button>
              <Button
                size="lg"
                onClick={() => setShowCreditModal(true)}
                variant="outline"
                className="rounded-2xl border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                Check Credit Score
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={tfsLogo} alt="TFS Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold">TFS</span>
              </div>
              <p className="text-white/80">
                Fast, transparent used-car loans with instant pre-approval and low EMIs.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/services/used-car-loan" className="hover:text-white">Used Car Loans</Link></li>
                <li><Link to="/emi-calculator" className="hover:text-white">EMI Calculator</Link></li>
                <li><button onClick={() => setShowCreditModal(true)} className="hover:text-white">Credit Score Check</button></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2">
                <p className="text-white/80">1800-123-4567</p>
                <p className="text-white/80">support@tfs.com</p>
                <Button
                  size="sm"
                  className="mt-4 rounded-2xl bg-accent hover:bg-accent/90"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Chat
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 mt-8 text-center text-white/60">
            <p>&copy; 2024 TFS - True Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 shadow-floating z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Credit Score Modal */}
      <CreditScoreModal 
        open={showCreditModal} 
        onOpenChange={setShowCreditModal} 
      />
    </div>
  );
};

export default Index;
