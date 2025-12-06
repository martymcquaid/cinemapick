-- Create food_items table
CREATE TABLE food_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(5,2) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('snacks', 'drinks', 'combos', 'ice-cream')),
    image_url TEXT,
    allergens TEXT[],
    sizes TEXT[],
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for faster queries
CREATE INDEX idx_food_items_category ON food_items(category);

-- Create index on availability for filtering available items
CREATE INDEX idx_food_items_is_available ON food_items(is_available);

-- Create index on name for search functionality
CREATE INDEX idx_food_items_name ON food_items(name);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_food_items_updated_at 
    BEFORE UPDATE ON food_items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();