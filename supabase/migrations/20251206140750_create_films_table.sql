-- Create films table
CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    synopsis TEXT,
    runtime INTEGER,
    genres TEXT[],
    age_rating VARCHAR(10),
    release_date DATE,
    poster_url TEXT,
    backdrop_url TEXT,
    trailer_url TEXT,
    rating DECIMAL(3,2),
    status VARCHAR(20) DEFAULT 'now-showing' CHECK (status IN ('now-showing', 'coming-soon')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on title for faster searches
CREATE INDEX IF NOT EXISTS idx_films_title ON films(title);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_films_status ON films(status);

-- Create index on release_date for sorting
CREATE INDEX IF NOT EXISTS idx_films_release_date ON films(release_date);