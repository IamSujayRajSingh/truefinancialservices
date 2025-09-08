import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
      description: "Thanks! Our team will contact you soon.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-trust-blue">Talk to an Expert</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Name *</Label>
            <Input
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="modal-email">Email *</Label>
            <Input
              id="modal-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="modal-phone">Phone *</Label>
            <Input
              id="modal-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="modal-message">Message *</Label>
            <Textarea
              id="modal-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="rounded-xl"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full rounded-2xl py-3 bg-accent-green hover:bg-accent-green/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;