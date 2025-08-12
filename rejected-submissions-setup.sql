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

-- Enable Row Level Security
ALTER TABLE public.rejected_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for rejected_submissions
CREATE POLICY "Admins can view all rejected submissions" ON public.rejected_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can insert rejected submissions" ON public.rejected_submissions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_rejected_submissions_rejected_by ON public.rejected_submissions(rejected_by);
CREATE INDEX IF NOT EXISTS idx_rejected_submissions_rejected_at ON public.rejected_submissions(rejected_at);
