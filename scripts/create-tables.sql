create extension if not exists "uuid-ossp";

CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL,
  status VARCHAR(10) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE cart_items (
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  count INT,
  PRIMARY KEY (cart_id, product_id)
);

CREATE OR REPLACE FUNCTION item_update_cart_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE carts
  SET updated_at = NOW()
  WHERE id = NEW.cart_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER item_update_cart_timestamp_trigger
AFTER INSERT OR UPDATE OR DELETE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION item_update_cart_timestamp();

CREATE OR REPLACE FUNCTION update_cart_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER status_update_cart_timestamp_trigger
BEFORE UPDATE ON carts
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION update_cart_timestamp();

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  password TEXT NOT NULL
);

CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE NO ACTION,
  payment JSON,
  delivery JSON,
  comments TEXT,
  status VARCHAR(10) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'PAYED', 'CONFIRMED', 'SENT', 'COMPLETED', 'CANCELLED')),
  total  INTEGER NOT NULL
);