-- Créer la table products (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  is_new BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Désactiver Row Level Security temporairement pour tester
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- OU si vous voulez garder RLS activé, utilisez ces commandes:
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow public read access" ON products;
-- CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
