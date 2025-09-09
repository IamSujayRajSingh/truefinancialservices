import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    document.title = "Contact TFS | Used Car Loan Experts";
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thanks! Our team will contact you soon."
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    setIsSubmitting(false);
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/lovable-uploads/20a40dff-a797-4362-a638-31c13052a65e.png" alt="TFS Logo" className="h-12 w-auto" />
            </Link>
            
            <div className="flex items-center space-x-8">
              <Link to="/services/used-car-loan" className="text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link to="/emi-calculator" className="text-muted-foreground hover:text-primary">
                EMI Calculator
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-primary font-medium">
                Contact
              </Link>
            </div>
            
            <Button asChild className="rounded-2xl">
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <motion.section initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="py-20 bg-gradient-to-r from-trust-blue to-accent-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">We're here to help you.</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have a question about your loan or our services? Reach out anytime.
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
              <Card className="p-8 shadow-card rounded-2xl">
                <h2 className="text-3xl font-bold text-primary mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="rounded-xl" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="rounded-xl" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="rounded-xl" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="rounded-xl" />
                  </div>
                  
                  <Button type="submit" className="w-full rounded-2xl py-6 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're always ready to help you with your car loan needs. Choose the most convenient way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 shadow-card rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Call Us</h3>
                      <p className="text-muted-foreground mb-2">Mon-Sat: 9:00 AM - 6:00 PM</p>
                      <a href="tel:+919999119283" className="text-xl font-semibold text-primary hover:underline">
                        +91-9999119283
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-accent-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-2">Quick support via chat</p>
                      <Button 
                        variant="outline" 
                        className="rounded-2xl border-accent-green text-accent-green hover:bg-accent-green hover:text-white"
                        onClick={() => window.open('https://wa.me/919999119283', '_blank')}
                      >
                        Start WhatsApp Chat
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">We'll respond within 24 hours</p>
                      
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Office Address</h3>
                      <p className="text-muted-foreground">
                        TFS Corporate Office<br />
                        123 Business District<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card className="p-6 shadow-card rounded-2xl">
                <div className="w-full h-64 bg-neutral-gray rounded-xl flex items-center justify-center">
                  
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/lovable-uploads/20a40dff-a797-4362-a638-31c13052a65e.png" alt="TFS Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold">TFS</span>
              </Link>
              <p className="text-white/80">
                Fast, transparent used-car loans with instant pre-approval and low EMIs.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/services/used-car-loan" className="hover:text-white">Used Car Loans</Link></li>
                <li><Link to="/emi-calculator" className="hover:text-white">EMI Calculator</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2">
                <p className="text-white/80">+91-9999119283</p>
                <p className="text-white/80">support@tfs.com</p>
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
        onClick={() => window.open('https://wa.me/919999119283', '_blank')}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>;
};
export default Contact;