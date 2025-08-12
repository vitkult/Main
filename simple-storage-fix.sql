-- Simple fix: Disable RLS on storage.objects for testing
-- This allows all authenticated users to upload files without complex folder restrictions

-- Disable RLS on storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want to keep some security, use this simpler policy instead
-- DROP POLICY IF EXISTS "Users can upload files to their own folder" ON storage.objects;
-- CREATE POLICY "Allow authenticated uploads" ON storage.objects
-- FOR ALL USING (auth.role() = 'authenticated');

-- Make sure the bucket exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('hackathon01', 'hackathon01', true, 52428800, ARRAY['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
