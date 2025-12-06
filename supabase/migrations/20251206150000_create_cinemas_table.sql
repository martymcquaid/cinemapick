-- Create cinemas table
CREATE TABLE cinemas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT NOT NULL,
  phone VARCHAR(20),
  email TEXT,
  coordinates_lat DECIMAL(10,8),
  coordinates_lng DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on city for faster queries
CREATE INDEX idx_cinemas_city ON cinemas(city);

-- Create index on county for faster queries
CREATE INDEX idx_cinemas_county ON cinemas(county);

-- Create index on coordinates for location-based queries
CREATE INDEX idx_cinemas_coordinates ON cinemas(coordinates_lat, coordinates_lng);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cinemas_updated_at 
    BEFORE UPDATE ON cinemas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();