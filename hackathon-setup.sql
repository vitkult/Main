-- Hackathon Database Setup for VITKULT
-- Run this script in your Supabase SQL Editor

-- Create hackathon_submissions table
CREATE TABLE IF NOT EXISTS public.hackathon_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name TEXT NOT NULL,
    college_name TEXT NOT NULL,
    team_leader JSONB NOT NULL, -- {name, registrationNumber, email}
    team_members JSONB NOT NULL, -- Array of {name, registrationNumber, email}
    problem_statement_id INTEGER NOT NULL CHECK (problem_statement_id BETWEEN 1 AND 5),
    ppt_file_url TEXT NOT NULL,
    ppt_file_name TEXT NOT NULL,
    additional_info TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (email LIKE '%@vitbhopal.ac.in'),
    added_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the first admin user (you)
INSERT INTO public.admin_users (email, added_by) 
VALUES ('nithin.23mim10111@vitbhopal.ac.in', 'system')
ON CONFLICT (email) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_user_id ON public.hackathon_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_status ON public.hackathon_submissions(status);
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_created_at ON public.hackathon_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Enable Row Level Security
ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hackathon_submissions
-- Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON public.hackathon_submissions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own submissions
CREATE POLICY "Users can insert own submissions" ON public.hackathon_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own submissions
CREATE POLICY "Users can update own submissions" ON public.hackathon_submissions
    FOR UPDATE USING (auth.uid() = user_id);

-- Admin users can view all submissions
CREATE POLICY "Admins can view all submissions" ON public.hackathon_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Admin users can update all submissions
CREATE POLICY "Admins can update all submissions" ON public.hackathon_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- RLS Policies for admin_users
-- Only existing admins can view admin users
CREATE POLICY "Admins can view admin users" ON public.admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Only existing admins can insert new admin users
CREATE POLICY "Admins can insert admin users" ON public.admin_users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Only existing admins can delete admin users
CREATE POLICY "Admins can delete admin users" ON public.admin_users
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_hackathon_submissions_updated_at 
    BEFORE UPDATE ON public.hackathon_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON public.admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for hackathon submissions
-- Note: You'll need to create this bucket manually in the Supabase dashboard
-- Go to Storage > Create a new bucket named 'hackathon-submissions'
-- Set it to private and add the following policy:

-- Policy for hackathon-submissions bucket
-- Users can upload files to their own folder
-- INSERT policy: auth.uid()::text = (storage.foldername(name))[1]
-- SELECT policy: auth.uid()::text = (storage.foldername(name))[1] OR 
--   EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email')

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.hackathon_submissions TO authenticated;
GRANT ALL ON public.admin_users TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
