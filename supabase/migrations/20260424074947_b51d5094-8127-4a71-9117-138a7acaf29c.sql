DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;

CREATE POLICY "Anyone can submit a valid booking"
  ON public.bookings FOR INSERT
  WITH CHECK (
    char_length(trim(name)) BETWEEN 2 AND 80
    AND char_length(trim(phone)) BETWEEN 8 AND 20
    AND phone ~ '^[0-9+\-\s()]+$'
    AND char_length(coalesce(notes,'')) <= 500
    AND char_length(coalesce(service,'')) <= 100
    AND status = 'new'
  );