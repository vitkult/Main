-- Temporary fix: Disable RLS on hackathon_submissions table
-- This will allow all authenticated users to see all submissions
-- Use this for testing to see if data exists

-- Disable RLS on hackathon_submissions table
ALTER TABLE public.hackathon_submissions DISABLE ROW LEVEL SECURITY;

-- Optional: If you want to re-enable RLS later with a simple policy, use this:
-- ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;
-- 
-- DROP POLICY IF EXISTS "Allow all authenticated users to view submissions" ON public.hackathon_submissions;
-- CREATE POLICY "Allow all authenticated users to view submissions" ON public.hackathon_submissions
--     FOR SELECT USING (auth.role() = 'authenticated');