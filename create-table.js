import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grfgqztuedpmyrrwrmly.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmdxenR1ZWRwbXlycnJybWx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzgwMjY3MSwiZXhwIjoyMDQ5Mzc4NjcxfQ.7Yq8tHJNqW9xYnN8oJf4rXmGhJjZtVqJ9r2qF3kL7c'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createFilmsTable() {
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
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
      
      CREATE INDEX IF NOT EXISTS idx_films_title ON films(title);
      CREATE INDEX IF NOT EXISTS idx_films_status ON films(status);
      CREATE INDEX IF NOT EXISTS idx_films_release_date ON films(release_date);
    `
  })
  
  if (error) {
    console.error('Error creating table:', error)
  } else {
    console.log('Table created successfully:', data)
  }
}

createFilmsTable()