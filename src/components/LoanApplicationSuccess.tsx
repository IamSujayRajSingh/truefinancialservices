import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoanApplicationSuccessProps {
  onStartNewApplication: () => void;
}

const LoanApplicationSuccess: React.FC<LoanApplicationSuccessProps> = ({ 
  onStartNewApplication 
}) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918505830148', '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+918505830148', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-card border rounded-2xl p-8 shadow-card">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for choosing TFS. Your loan application has been submitted successfully. 
            Our team will review your application and reach out within 24 hours.
          </p>

          <div className="bg-muted/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  1
                </div>
                <p className="text-sm text-muted-foreground">
                  Our team will verify your documents and information
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll contact you within 24 hours for any additional requirements
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  3
                </div>
                <p className="text-sm text-muted-foreground">
                  Once approved, loan disbursement within 48 hours
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Talk to our experts via WhatsApp or call now for immediate assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 bg-success hover:bg-success/90"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Chat</span>
              </Button>
              
              <Button
                onClick={handleCallClick}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call +91 8505830148</span>
              </Button>
            </div>

            <div className="pt-6 border-t border-border mt-8">
              <Button
                onClick={onStartNewApplication}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Start Another Application
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoanApplicationSuccess;