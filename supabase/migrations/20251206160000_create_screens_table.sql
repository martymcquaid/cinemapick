-- Create screens table
CREATE TABLE IF NOT EXISTS screens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cinema_id UUID NOT NULL REFERENCES cinemas(id) ON DELETE CASCADE,
  screen_number INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  formats TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_screens_cinema_id ON screens(cinema_id);

-- Add unique constraint for screen number per cinema
CREATE UNIQUE INDEX IF NOT EXISTS idx_screens_cinema_screen_number ON screens(cinema_id, screen_number);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_screens_updated_at 
    BEFORE UPDATE ON screens 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();