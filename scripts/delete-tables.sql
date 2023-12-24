-- Drop tables
DROP TABLE IF EXISTS cart_items;

-- Drop tables with foreign key constraints
DROP TABLE IF EXISTS orders CASCADE;  -- Use CASCADE to drop dependent objects

DROP TABLE IF EXISTS products CASCADE;  -- Use CASCADE to drop dependent objects

DROP TABLE IF EXISTS carts CASCADE;  -- Use CASCADE to drop dependent objects

-- Drop tables
DROP TABLE IF EXISTS users;
