-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    added_by TEXT NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users
CREATE POLICY "Super admin can manage all admin users" ON public.admin_users
    FOR ALL USING (auth.jwt() ->> 'email' = 'nithin.23mim10111@vitbhopal.ac.in');

CREATE POLICY "Admin users can view admin list" ON public.admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Insert super admin (nithin.23mim10111@vitbhopal.ac.in)
INSERT INTO public.admin_users (email, role, added_by, added_at)
VALUES ('nithin.23mim10111@vitbhopal.ac.in', 'super_admin', 'system', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Create hackathon_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.hackathon_submissions (
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
    status TEXT DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hackathon_submissions
CREATE POLICY "Users can insert their own submissions" ON public.hackathon_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions" ON public.hackathon_submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.hackathon_submissions
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow admins to view all submissions
CREATE POLICY "Admins can view all submissions" ON public.hackathon_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_user_id ON public.hackathon_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_status ON public.hackathon_submissions(status);
