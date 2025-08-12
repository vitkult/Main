-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    added_by TEXT NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Insert super admin (you)
INSERT INTO public.admin_users (email, role, added_by, added_at)
VALUES ('nithin.23mim10111@vitbhopal.ac.in', 'super_admin', 'system', NOW())
ON CONFLICT (email) DO NOTHING;

-- Disable RLS on admin_users table for now (simpler approach)
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;