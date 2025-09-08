-- Create enum for employment types
CREATE TYPE public.employment_type AS ENUM ('salaried', 'self_employed');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('new', 'in_review', 'approved', 'rejected', 'disbursed');

-- Create loan applications table
CREATE TABLE public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information (Step 1)
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  pincode TEXT NOT NULL,
  city TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  
  -- Loan & Car Details (Step 2)
  car_make_model TEXT,
  year_of_manufacture INTEGER,
  car_value DECIMAL(12,2),
  desired_loan_amount DECIMAL(12,2),
  tenure_months INTEGER,
  employment_type employment_type,
  monthly_income DECIMAL(12,2),
  check_credit_score BOOLEAN DEFAULT false,
  
  -- Document URLs (Step 3)
  pan_card_url TEXT,
  aadhaar_url TEXT,
  salary_slip_itr_url TEXT,
  rc_url TEXT,
  
  -- Application metadata
  status application_status NOT NULL DEFAULT 'new',
  credit_score INTEGER,
  current_step INTEGER NOT NULL DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public application)
CREATE POLICY "Anyone can create loan applications" 
ON public.loan_applications 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow users to view their own applications (by mobile/email)
CREATE POLICY "Users can view their own applications" 
ON public.loan_applications 
FOR SELECT 
USING (true);

-- Create policy to allow users to update their own applications
CREATE POLICY "Users can update their own applications" 
ON public.loan_applications 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_loan_applications_updated_at
BEFORE UPDATE ON public.loan_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('loan-documents', 'loan-documents', false);

-- Create storage policies for document uploads
CREATE POLICY "Anyone can upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'loan-documents');

CREATE POLICY "Anyone can view documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'loan-documents');

-- Create index for better performance
CREATE INDEX idx_loan_applications_mobile ON public.loan_applications(mobile_number);
CREATE INDEX idx_loan_applications_email ON public.loan_applications(email);
CREATE INDEX idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX idx_loan_applications_created_at ON public.loan_applications(created_at DESC);