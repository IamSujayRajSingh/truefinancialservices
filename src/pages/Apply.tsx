import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoanApplicationForm from '@/components/LoanApplicationForm';
import LoanApplicationSuccess from '@/components/LoanApplicationSuccess';

const Apply = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitSuccess = () => {
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewApplication = () => {
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* SEO Meta Tags */}
      <title>Apply for a Used Car Loan | TFS (True Financial Services)</title>
      
      {showSuccess ? (
        <div className="container mx-auto px-4 py-16">
          <LoanApplicationSuccess onStartNewApplication={handleStartNewApplication} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4 py-16 lg:py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                  Apply for Your{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Used Car Loan
                  </span>{' '}
                  in Minutes
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Simple 3-step application process. Get pre-approved instantly and 
                  complete disbursement within 48 hours.
                </p>

                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl shadow-floating hover:shadow-card transition-all duration-300"
                >
                  Start Application Now
                </Button>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Instant Pre-approval</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>48-hour Disbursement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Competitive Interest Rates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>100% Digital Process</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Application Form Section */}
          <section ref={formRef} className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <LoanApplicationForm onSubmitSuccess={handleSubmitSuccess} />
              </motion.div>
            </div>
          </section>

          {/* Help Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Need Help While Applying?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Talk to our experts via WhatsApp or call now for immediate assistance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.open('https://wa.me/918505830148', '_blank')}
                    className="flex items-center space-x-2 bg-success hover:bg-success/90"
                    size="lg"
                  >
                    <span>WhatsApp Chat</span>
                  </Button>
                  
                  <Button
                    onClick={() => window.open('tel:+918505830148', '_blank')}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <span>Call +91 8505830148</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Apply;