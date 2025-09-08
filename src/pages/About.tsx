import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Zap, Heart } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About TFS — True Financial Services";
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Trust",
      description: "Building lasting relationships through transparency and reliability"
    },
    {
      icon: Users,
      title: "Transparency", 
      description: "Clear terms, no hidden fees, honest communication always"
    },
    {
      icon: Heart,
      title: "Customer-First",
      description: "Your financial wellness is our top priority"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Using technology to make car financing simple and fast"
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      title: "CEO & Co-Founder",
      image: "/placeholder.svg"
    },
    {
      name: "Priya Sharma", 
      title: "Head of Operations",
      image: "/placeholder.svg"
    },
    {
      name: "Amit Patel",
      title: "Chief Technology Officer",
      image: "/placeholder.svg"
    },
    {
      name: "Neha Singh",
      title: "Head of Customer Success",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/lovable-uploads/df21c149-40ae-4c45-9d69-3c64f729fa04.png" alt="TFS Logo" className="h-12 w-auto" />
            </Link>
            
            <div className="flex items-center space-x-8">
              <Link to="/services/used-car-loan" className="text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link to="/emi-calculator" className="text-muted-foreground hover:text-primary">
                EMI Calculator
              </Link>
              <Link to="/about" className="text-primary font-medium">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
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
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-to-r from-trust-blue to-accent-green text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About True Financial Services (TFS)</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your trusted partner for smart, transparent, and flexible car financing.
          </p>
        </div>
      </motion.section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl font-bold text-primary">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TFS was founded with a simple mission: to make car financing accessible, transparent, and fair for everyone. 
              We saw how complex and overwhelming the traditional lending process could be, with hidden fees and unclear terms. 
              That's why we built a platform that connects you with multiple trusted lenders, ensuring you get the best possible 
              rates and terms for your unique situation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since our inception, we've helped thousands of customers save money on their car loans through refinancing, 
              top-ups, and balance transfers. Our technology-driven approach combined with human expertise ensures you get 
              personalized service every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-neutral-gray">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-2xl text-muted-foreground italic">
              "Empowering every car owner with fair, fast, and transparent finance solutions."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center space-y-6 h-full shadow-card rounded-2xl hover:shadow-floating transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-gray">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center space-y-4 shadow-card rounded-2xl hover:shadow-floating transition-all duration-300">
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                    <p className="text-muted-foreground">{member.title}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/lovable-uploads/df21c149-40ae-4c45-9d69-3c64f729fa04.png" alt="TFS Logo" className="h-10 w-auto" />
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
                <p className="text-white/80">1800-123-4567</p>
                <p className="text-white/80">support@tfs.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 mt-8 text-center text-white/60">
            <p>&copy; 2024 TFS - True Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;