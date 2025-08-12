-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@vitbhopal.ac.in'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert during signup" ON public.users;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id::text);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Create policy to allow insert during signup
CREATE POLICY "Users can insert during signup" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create hackathon_submissions table
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.hackathon_submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.hackathon_submissions;
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.hackathon_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.hackathon_submissions;
DROP POLICY IF EXISTS "Users can view their own submissions or admins can view all" ON public.hackathon_submissions;

-- Create RLS policies for hackathon_submissions
-- Allow users to insert their own submissions
CREATE POLICY "Users can insert their own submissions" ON public.hackathon_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own submissions
CREATE POLICY "Users can update their own submissions" ON public.hackathon_submissions
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to view their own submissions OR admins to view all submissions
CREATE POLICY "Users can view their own submissions or admins can view all" ON public.hackathon_submissions
    FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_user_id ON public.hackathon_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_submissions_status ON public.hackathon_submissions(status);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    added_by TEXT NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Super admin can manage all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view admin list" ON public.admin_users;

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

-- Insert super admin
INSERT INTO public.admin_users (email, role, added_by, added_at)
VALUES ('nithin.23mim10111@vitbhopal.ac.in', 'super_admin', 'system', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Create function to get all submissions for admin users (bypasses RLS)
CREATE OR REPLACE FUNCTION get_all_submissions_for_admin()
RETURNS TABLE (
    id UUID,
    team_name TEXT,
    team_leader JSONB,
    team_members JSONB,
    problem_statement_id INTEGER,
    ppt_file_url TEXT,
    ppt_file_name TEXT,
    additional_info TEXT,
    transaction_number TEXT,
    registration_fee INTEGER,
    team_size INTEGER,
    user_id UUID,
    user_email TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if the current user is an admin
    IF EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE email = auth.jwt() ->> 'email'
    ) OR auth.jwt() ->> 'email' = 'nithin.23mim10111@vitbhopal.ac.in' THEN
        -- User is admin, return all submissions
        RETURN QUERY
        SELECT h.id, h.team_name, h.team_leader, h.team_members, h.problem_statement_id,
               h.ppt_file_url, h.ppt_file_name, h.additional_info, h.transaction_number,
               h.registration_fee, h.team_size, h.user_id, h.user_email, h.status,
               h.created_at, h.updated_at
        FROM public.hackathon_submissions h
        ORDER BY h.created_at DESC;
    ELSE
        -- User is not admin, return empty result
        RETURN;
    END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_submissions_for_admin() TO authenticated;
