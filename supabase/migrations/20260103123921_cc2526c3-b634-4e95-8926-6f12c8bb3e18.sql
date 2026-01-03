-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Policy: Candidates can upload their own resumes
CREATE POLICY "Candidates can upload own resume"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Candidates can update their own resumes
CREATE POLICY "Candidates can update own resume"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Candidates can delete their own resumes
CREATE POLICY "Candidates can delete own resume"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Candidates can view their own resumes
CREATE POLICY "Candidates can view own resume"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Recruiters can view resumes of applicants to their jobs
CREATE POLICY "Recruiters can view applicant resumes"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'resumes' 
  AND EXISTS (
    SELECT 1 FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE j.recruiter_id = auth.uid()
    AND a.candidate_id::text = (storage.foldername(name))[1]
  )
);