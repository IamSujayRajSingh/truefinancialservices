import { motion } from "framer-motion";
import { RotateCcw, Plus, ArrowLeftRight, CheckCircle, Shield, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import ContactModal from "@/components/ContactModal";
const Services = () => {
  const services = [{
    icon: RotateCcw,
    title: "Refinance Your Used Car Loan",
    description: "Lower your EMI or reduce your tenure by refinancing your existing used car loan at better rates. Save on interest and free up cash flow.",
    cta: "Explore Refinance Options"
  }, {
    icon: Plus,
    title: "Top Up on Your Current Loan",
    description: "Need extra funds? Get additional financing over your existing used car loan with flexible tenure and quick approvals.",
    cta: "Apply for Top Up Loan"
  }, {
    icon: ArrowLeftRight,
    title: "Transfer Your Loan Balance",
    description: "Switch your used car loan to a new lender offering lower interest rates and better terms. Reduce EMI burden instantly.",
    cta: "Start Loan Transfer"
  }];
  const benefits = [{
    icon: CheckCircle,
    title: "Multiple lenders compared instantly",
    description: "Get the best rates from our network of trusted lenders"
  }, {
    icon: Shield,
    title: "Transparent process, no hidden charges",
    description: "Clear terms and conditions with upfront fee disclosure"
  }, {
    icon: Users,
    title: "Dedicated support until disbursement",
    description: "Personal relationship manager to guide you through the process"
  }];
  const faqs = [{
    question: "What is a refinance loan?",
    answer: "A refinance loan allows you to replace your existing used car loan with a new loan at better terms, potentially reducing your EMI or loan tenure while saving on interest costs."
  }, {
    question: "Can I get a top-up loan if my car loan is less than 1 year old?",
    answer: "Yes, you can apply for a top-up loan even if your existing car loan is less than 1 year old, subject to lender approval and your repayment track record."
  }, {
    question: "What charges apply for a balance transfer?",
    answer: "Balance transfer charges typically include processing fees (0.5-2% of loan amount), legal charges, and stamp duty. We provide transparent fee disclosure upfront with no hidden costs."
  }];
  return <div className="min-h-screen bg-neutral-gray/30">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img src="/lovable-uploads/20a40dff-a797-4362-a638-31c13052a65e.png" alt="TFS Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <ContactModal>
              <Button variant="outline" className="text-trust-blue border-trust-blue hover:bg-trust-blue hover:text-white">
                Talk to an Expert
              </Button>
            </ContactModal>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-trust-blue via-trust-blue/90 to-trust-blue/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Flexible Used Car Finance Services for Every Need
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Refinance, Top Up, or Transfer your existing used car loan — TFS brings you smart, tailored solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent-green hover:bg-accent-green/90 text-white px-8 py-3 text-lg">
                Check My Eligibility
              </Button>
              <ContactModal>
                <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-trust-blue px-8 py-3 text-lg">
                  Talk to an Expert
                </Button>
              </ContactModal>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-trust-blue mb-4">
              Our Finance Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the right financial solution that fits your needs and unlock better terms for your used car loan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
            const Icon = service.icon;
            return <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} whileHover={{
              y: -5
            }} className="h-full">
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0 bg-white">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-3 bg-trust-blue/10 rounded-full w-fit">
                        <Icon className="h-8 w-8 text-trust-blue" />
                      </div>
                      <CardTitle className="text-xl text-trust-blue mb-2">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 text-base mb-6 leading-relaxed">
                        {service.description}
                      </CardDescription>
                      <Button className="w-full bg-accent-green hover:bg-accent-green/90 text-white">
                        {service.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* Why Choose TFS Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-trust-blue mb-4">
              Why Choose TFS Finance Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make your financial journey smooth with our expert guidance and transparent processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return <motion.div key={index} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-accent-green/10 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-accent-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-trust-blue mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-gray/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-trust-blue mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our used car finance services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl shadow-sm border-0 px-6">
                  <AccordionTrigger className="text-left text-trust-blue font-semibold py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-trust-blue to-trust-blue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Restructure Your Used Car Loan?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get a free consultation and see how much you can save today.
            </p>
            <Button size="lg" className="bg-accent-green hover:bg-accent-green/90 text-white px-12 py-4 text-lg">
              Check My Eligibility Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/lovable-uploads/20a40dff-a797-4362-a638-31c13052a65e.png" alt="TFS Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">TFS</span>
          </div>
          <p className="text-gray-400">
            © 2024 True Financial Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>;
};
export default Services;