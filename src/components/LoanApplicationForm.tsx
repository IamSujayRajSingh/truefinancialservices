import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Car, FileText, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LoanApplicationData {
  // Step 1
  fullName: string;
  mobileNumber: string;
  email: string;
  pincode: string;
  city: string;
  consentGiven: boolean;
  
  // Step 2
  carMakeModel: string;
  yearOfManufacture: number;
  carValue: number;
  desiredLoanAmount: number;
  tenureMonths: number;
  employmentType: 'salaried' | 'self_employed';
  monthlyIncome: number;
  checkCreditScore: boolean;
  
  // Step 3
  panCard: File | null;
  aadhaar: File | null;
  salarySlipItr: File | null;
  rc: File | null;
}

interface LoanApplicationFormProps {
  onSubmitSuccess: () => void;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LoanApplicationData>({
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      pincode: '',
      city: '',
      consentGiven: false,
      carMakeModel: '',
      yearOfManufacture: new Date().getFullYear(),
      carValue: 0,
      desiredLoanAmount: 0,
      tenureMonths: 12,
      employmentType: 'salaried',
      monthlyIncome: 0,
      checkCreditScore: false,
      panCard: null,
      aadhaar: null,
      salarySlipItr: null,
      rc: null
    }
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem('loanApplicationData', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('loanApplicationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
          if (key !== 'panCard' && key !== 'aadhaar' && key !== 'salarySlipItr' && key !== 'rc') {
            form.setValue(key as keyof LoanApplicationData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, [form]);

  const uploadFile = async (file: File, applicationId: string, fileType: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/${fileType}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('loan-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      return data.path;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof LoanApplicationData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ['fullName', 'mobileNumber', 'email', 'pincode', 'city'];
        break;
      case 2:
        fieldsToValidate = ['carMakeModel', 'yearOfManufacture', 'carValue', 'desiredLoanAmount', 'monthlyIncome'];
        break;
      case 3:
        // File validation will be handled separately
        return true;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 1 && !form.getValues('consentGiven')) {
      toast({
        title: "Consent Required",
        description: "Please provide consent to proceed with the application.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: LoanApplicationData) => {
    setIsSubmitting(true);
    
    try {
      // First, create or update the application record
      const applicationData = {
        full_name: data.fullName,
        mobile_number: data.mobileNumber,
        email: data.email,
        pincode: data.pincode,
        city: data.city,
        consent_given: data.consentGiven,
        car_make_model: data.carMakeModel,
        year_of_manufacture: data.yearOfManufacture,
        car_value: data.carValue,
        desired_loan_amount: data.desiredLoanAmount,
        tenure_months: data.tenureMonths,
        employment_type: data.employmentType,
        monthly_income: data.monthlyIncome,
        check_credit_score: data.checkCreditScore,
        current_step: 3,
        status: 'new' as const
      };

      let currentApplicationId = applicationId;

      if (!currentApplicationId) {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to submit a loan application.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const { data: newApplication, error: insertError } = await supabase
          .from('loan_applications')
          .insert({
            ...applicationData,
            user_id: user.id
          })
          .select('id')
          .single();

        if (insertError) throw insertError;
        currentApplicationId = newApplication.id;
        setApplicationId(currentApplicationId);
      }

      // Upload files if provided
      const fileUploads = [];
      if (data.panCard) {
        fileUploads.push(uploadFile(data.panCard, currentApplicationId, 'pan_card'));
      }
      if (data.aadhaar) {
        fileUploads.push(uploadFile(data.aadhaar, currentApplicationId, 'aadhaar'));
      }
      if (data.salarySlipItr) {
        fileUploads.push(uploadFile(data.salarySlipItr, currentApplicationId, 'salary_slip_itr'));
      }
      if (data.rc) {
        fileUploads.push(uploadFile(data.rc, currentApplicationId, 'rc'));
      }

      const uploadResults = await Promise.all(fileUploads);
      
      // Update application with file URLs
      const updateData: any = {};
      let uploadIndex = 0;
      
      if (data.panCard) updateData.pan_card_url = uploadResults[uploadIndex++];
      if (data.aadhaar) updateData.aadhaar_url = uploadResults[uploadIndex++];
      if (data.salarySlipItr) updateData.salary_slip_itr_url = uploadResults[uploadIndex++];
      if (data.rc) updateData.rc_url = uploadResults[uploadIndex++];

      if (Object.keys(updateData).length > 0) {
        const { error: updateError } = await supabase
          .from('loan_applications')
          .update(updateData)
          .eq('id', currentApplicationId);

        if (updateError) throw updateError;
      }

      // Clear saved data
      localStorage.removeItem('loanApplicationData');
      
      toast({
        title: "Application Submitted!",
        description: "Your loan application has been submitted successfully. Our team will reach out within 24 hours.",
      });

      onSubmitSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [
    { icon: User, label: "Basic Info" },
    { icon: Car, label: "Loan Details" },
    { icon: FileText, label: "Documents" }
  ];

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {stepIcons.map((step, index) => {
            const StepIcon = step.icon;
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${isCompleted ? 'bg-success border-success text-success-foreground' : 
                    isCurrent ? 'bg-primary border-primary text-primary-foreground' : 
                    'bg-background border-border text-muted-foreground'}
                `}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {index < stepIcons.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    isCompleted ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">Step {currentStep} of 3</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card border rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    rules={{ required: "Full name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    rules={{ 
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Please enter a valid 10-digit mobile number"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    rules={{ 
                      required: "Pincode is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Please enter a valid 6-digit pincode"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="consentGiven"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I consent to be contacted by TFS and partner lenders.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card border rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-2xl font-semibold mb-6">Loan & Car Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="carMakeModel"
                    rules={{ required: "Car make/model is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Make/Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Maruti Suzuki Swift" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearOfManufacture"
                    rules={{ 
                      required: "Year of manufacture is required",
                      min: { value: 2005, message: "Year must be 2005 or later" },
                      max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Manufacture</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2020"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="carValue"
                    rules={{ 
                      required: "Car value is required",
                      min: { value: 100000, message: "Car value must be at least ₹1,00,000" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Value (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="500000"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredLoanAmount"
                    rules={{ 
                      required: "Desired loan amount is required",
                      min: { value: 50000, message: "Loan amount must be at least ₹50,000" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Loan Amount (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="400000"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenureMonths"
                    rules={{ required: "Tenure is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenure</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tenure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                            <SelectItem value="72">72 months</SelectItem>
                            <SelectItem value="84">84 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    rules={{ required: "Employment type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="salaried">Salaried</SelectItem>
                            <SelectItem value="self_employed">Self-Employed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    rules={{ 
                      required: "Monthly income is required",
                      min: { value: 15000, message: "Monthly income must be at least ₹15,000" }
                    }}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Monthly Income (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="50000"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="checkCreditScore"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            Also check my credit score (free)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card border rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-2xl font-semibold mb-6">Document Upload</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'panCard', label: 'PAN Card', required: true },
                    { name: 'aadhaar', label: 'Aadhaar Card', required: true },
                    { name: 'salarySlipItr', label: 'Salary Slip / ITR', required: true },
                    { name: 'rc', label: 'RC (if applicable)', required: false }
                  ].map((doc) => (
                    <FormField
                      key={doc.name}
                      control={form.control}
                      name={doc.name as keyof LoanApplicationData}
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>
                            {doc.label} {doc.required && <span className="text-destructive">*</span>}
                          </FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                              <input
                                {...field}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  onChange(file);
                                }}
                                className="hidden"
                                id={doc.name}
                              />
                              <label htmlFor={doc.name} className="cursor-pointer">
                                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  {value ? (value as File).name : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF, JPG, PNG up to 10MB
                                </p>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoanApplicationForm;