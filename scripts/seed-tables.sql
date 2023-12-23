-- Load the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Seed users
INSERT INTO users (name, email, password)
VALUES
  ('John Doe', 'johndoe@test.com', 'test1234'),
  ('Jane Doe', 'janedoe@test.com', 'test1234'),
  ('John Smith', 'johnsmith@test.com', 'test1234'),
  ('Jane Smith', 'janesmith@test.com', 'test1234');

-- Seed carts
INSERT INTO carts (user_id, status)
SELECT
  users.id,
  CASE WHEN random() < 0.5 THEN 'OPEN' ELSE 'ORDERED' END
FROM users;

-- Seed cart_items
INSERT INTO cart_items (cart_id, product_id, count)
SELECT
  carts.id AS cart_id,
  uuid_generate_v4() AS product_id,
  floor(random() * 5 + 1) AS count
FROM carts
JOIN users ON carts.user_id = users.id;

-- Seed orders
INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total)
SELECT
  users.id AS user_id,
  carts.id AS cart_id,
  '{"method": "credit_card", "amount": 100}'::jsonb AS payment,
  '{"address": "123 Main St", "city": "Cityville", "zipcode": "12345"}'::jsonb AS delivery,
  'Test order comments' AS comments,
  CASE WHEN random() < 0.7 THEN 'PAYED' ELSE 'OPEN' END AS status,
  floor(random() * 500 + 100) AS total
FROM carts
JOIN users ON carts.user_id = users.id;
