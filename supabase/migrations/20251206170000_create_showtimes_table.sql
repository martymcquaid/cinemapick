-- Create showtimes table
CREATE TABLE showtimes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  film_id uuid NOT NULL REFERENCES films(id) ON DELETE CASCADE,
  cinema_id uuid NOT NULL REFERENCES cinemas(id) ON DELETE CASCADE,
  screen_id uuid NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
  show_date date NOT NULL,
  show_time time NOT NULL,
  format varchar(20) NOT NULL CHECK (format IN ('standard', 'imax', '4dx', 'vip', '3d')),
  base_price decimal(5,2) NOT NULL CHECK (base_price > 0),
  available_seats integer NOT NULL CHECK (available_seats >= 0),
  total_seats integer NOT NULL CHECK (total_seats > 0),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT valid_seats CHECK (available_seats <= total_seats)
);

-- Create indexes for better query performance
CREATE INDEX idx_showtimes_film_id ON showtimes(film_id);
CREATE INDEX idx_showtimes_cinema_id ON showtimes(cinema_id);
CREATE INDEX idx_showtimes_screen_id ON showtimes(screen_id);
CREATE INDEX idx_showtimes_date_time ON showtimes(show_date, show_time);
CREATE INDEX idx_showtimes_format ON showtimes(format);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_showtimes_updated_at 
    BEFORE UPDATE ON showtimes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();