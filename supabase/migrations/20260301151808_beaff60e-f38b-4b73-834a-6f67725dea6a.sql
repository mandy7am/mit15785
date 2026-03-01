
-- Create table for synced MIT courses
CREATE TABLE public.mit_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_code TEXT NOT NULL,
  title TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 12,
  description TEXT,
  prerequisites TEXT,
  time_slot TEXT,
  day TEXT,
  department TEXT NOT NULL DEFAULT '15',
  semester TEXT,
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on course_code to prevent duplicates
CREATE UNIQUE INDEX idx_mit_courses_code ON public.mit_courses (course_code);

-- Create index on department for filtering
CREATE INDEX idx_mit_courses_department ON public.mit_courses (department);

-- Enable RLS
ALTER TABLE public.mit_courses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read courses (public catalog data)
CREATE POLICY "Anyone can read MIT courses" ON public.mit_courses FOR SELECT USING (true);

-- Only backend (service role) can insert/update/delete
CREATE POLICY "Service role can manage courses" ON public.mit_courses FOR ALL USING (auth.role() = 'service_role');
