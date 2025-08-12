-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    added_by TEXT NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rejected_submissions table
CREATE TABLE IF NOT EXISTS public.rejected_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name TEXT NOT NULL,
    team_leader JSONB NOT NULL,
    team_members JSONB NOT NULL,
    problem_statement_id INTEGER NOT NULL,
    ppt_file_url TEXT,
    ppt_file_name TEXT,
    additional_info TEXT,
    transaction_number TEXT NOT NULL,
    registration_fee INTEGER NOT NULL,
    team_size INTEGER NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT NOT NULL,
    status TEXT DEFAULT 'rejected',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rejected_by TEXT NOT NULL,
    rejected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_rejected_submissions_rejected_by ON public.rejected_submissions(rejected_by);
CREATE INDEX IF NOT EXISTS idx_rejected_submissions_rejected_at ON public.rejected_submissions(rejected_at);

-- Insert super admin (you)
INSERT INTO public.admin_users (email, role, added_by, added_at)
VALUES ('nithin.23mim10111@vitbhopal.ac.in', 'super_admin', 'system', NOW())
ON CONFLICT (email) DO NOTHING;

-- Disable RLS on both tables for simpler management
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.rejected_submissions DISABLE ROW LEVEL SECURITY;