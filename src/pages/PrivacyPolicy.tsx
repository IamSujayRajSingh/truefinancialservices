import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy — TFS";
  }, []);

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
              <Link to="/about" className="text-muted-foreground hover:text-primary">
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
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            How TFS protects and uses your data.
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-12 shadow-card rounded-2xl space-y-8">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground">
                  Last updated: January 2024
                </p>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary">Information We Collect</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We collect information that you provide directly to us when applying for our loan services, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Personal details (name, address, date of birth, PAN, Aadhaar)</li>
                    <li>Contact information (phone number, email address)</li>
                    <li>Financial information (income, employment details, bank statements)</li>
                    <li>Vehicle information (make, model, year, registration details)</li>
                    <li>Credit history and score information</li>
                    <li>Documents required for loan processing (income proof, ID verification)</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary">How We Use Your Information</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Processing your loan application and determining eligibility</li>
                    <li>Matching you with suitable lenders from our network</li>
                    <li>Providing customer support and responding to your inquiries</li>
                    <li>Improving our services and developing new features</li>
                    <li>Complying with legal and regulatory requirements</li>
                    <li>Preventing fraud and ensuring platform security</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary">Sharing Information with Partners</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We may share your information with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Our network of approved lenders to process your loan application</li>
                    <li>Credit bureaus and financial institutions for credit assessment</li>
                    <li>Government agencies and regulators as required by law</li>
                    <li>Service providers who help us operate our platform (with strict confidentiality agreements)</li>
                  </ul>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We do not sell or rent your personal information to third parties for marketing purposes.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary">Data Security</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>256-bit SSL encryption for all data transmission</li>
                    <li>Secure servers with regular security audits</li>
                    <li>Multi-factor authentication for account access</li>
                    <li>Regular employee training on data protection</li>
                    <li>Compliance with industry security standards</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary">Your Rights</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You have the following rights regarding your personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Access your personal information and request a copy</li>
                    <li>Correct or update inaccurate information</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Withdraw consent for data processing</li>
                    <li>File a complaint with data protection authorities</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary">Contact for Privacy Concerns</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    If you have any questions or concerns about our privacy practices, please contact us:
                  </p>
                  <div className="bg-neutral-gray p-6 rounded-xl">
                    <p className="text-muted-foreground mb-2">
                      <strong>Data Protection Officer</strong><br />
                      TFS - True Financial Services<br />
                      Email: privacy@tfs.com<br />
                      Phone: 1800-123-4567
                    </p>
                    <p className="text-muted-foreground">
                      Or visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link> for more ways to reach us.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary">Updates to This Policy</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                    the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services 
                    after such changes indicates your acceptance of the updated policy.
                  </p>
                </section>
              </div>
            </Card>
          </motion.div>
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

export default PrivacyPolicy;