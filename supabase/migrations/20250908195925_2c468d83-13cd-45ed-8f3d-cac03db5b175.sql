-- Add user_id column to associate loan applications with users
ALTER TABLE public.loan_applications 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing records to set user_id to NULL (will need to be handled)
-- Note: Existing applications without user_id won't be accessible until assigned

-- Drop existing insecure RLS policies
DROP POLICY "Anyone can create loan applications" ON public.loan_applications;
DROP POLICY "Users can update their own applications" ON public.loan_applications;
DROP POLICY "Users can view their own applications" ON public.loan_applications;

-- Create secure RLS policies that restrict access to user's own data
CREATE POLICY "Users can create their own loan applications" 
ON public.loan_applications 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own loan applications" 
ON public.loan_applications 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own loan applications" 
ON public.loan_applications 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Create index for better performance on user_id queries
CREATE INDEX idx_loan_applications_user_id ON public.loan_applications(user_id);