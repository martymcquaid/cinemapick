const supabaseUrl = 'https://grfgqztuedpmyrrwrmly.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmdxenR1ZWRwbXlycnJybWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDI2NzEsImV4cCI6MjA0OTM3ODY3MX0.7Yq8tHJNqW9xYnN8oJf4rXmGhJjZtVqJ9r2qF3kL7c'

async function createFilmsTable() {
  try {
    // First, let's try to create the table using the raw SQL approach
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': supabaseAnonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: `
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
        `
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Error creating table:', error)
    } else {
      console.log('Table creation request sent successfully')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

createFilmsTable()