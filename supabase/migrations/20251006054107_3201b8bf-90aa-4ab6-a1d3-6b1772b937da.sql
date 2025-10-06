-- Make the first user (Enzo Belaro) owner permanently
UPDATE public.profiles 
SET role = 'owner'
WHERE user_id = 'ef1e58db-9d9b-4c6d-862d-7b4766e5b995';