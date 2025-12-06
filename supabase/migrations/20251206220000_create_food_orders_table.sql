-- Create food_orders table
CREATE TABLE food_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    food_item_id UUID NOT NULL REFERENCES food_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    size VARCHAR(10) CHECK (size IN ('small', 'medium', 'large')),
    price_at_time DECIMAL(5,2) NOT NULL CHECK (price_at_time >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_food_orders_booking_id ON food_orders(booking_id);
CREATE INDEX idx_food_orders_food_item_id ON food_orders(food_item_id);