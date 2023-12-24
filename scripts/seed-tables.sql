-- Load the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Seed users
INSERT INTO users (name, email, password)
VALUES
  ('elian_cheng', 'elian_cheng@test.com', 'TEST_PASSWORD');

-- Seed products
INSERT INTO products (id, title, description, price)
VALUES
  ('3e4f08fa-1ee7-416e-95e7-d8a7dc6b6356', 'Lenovo IdeaPad L3', 'Powerful laptop with FHD display, stereo speakers, and long battery life. Ideal for work, school, and entertainment.', 930),
  ('80ac4b13-6b4f-437f-a3ed-5be43ac352a8', 'IPhone 9', 'Classic design with a thicker body for a larger battery. Features a 64GB storage, 6-core A13 Bionic processor, and iOS 13.', 256),
  ('3807f313-c695-4f35-b7e1-ceca708304e1', 'IPhone X', 'Apple IPhone X with bezel-less design, glass-metal body, and 6-core A11 Bionic processor for enhanced speed and efficiency.', 381),
  ('a32a32d3-460a-4830-8363-bdce044e9581', 'Iiyama ProLite', 'Stylish edge-to-edge monitor with IPS panel, 4K resolution, and adjustable stand for optimal viewing experience.', 697),
  ('b84efb24-ae04-43f9-a5f1-2028fecd6de8', 'Oppo A53', 'Ultra-thin Oppo A53 with 90Hz display, large 5000mAh battery, and efficient Qualcomm Snapdragon processor.', 201),
  ('7e2f6b84-c8d5-41f9-add1-62bb46fadf1f', 'Huawei Matebook X Pro', 'Huawei MateBook X Pro with touch screen, Intel Core i7 processor, NVIDIA GeForce MX250, and 16GB RAM for powerful performance.', 1075),
  ('826ededb-883d-4e4c-be7b-b5a7199b619f', 'Apple MacBook Pro M2', 'Professional 13-inch MacBook Pro with M2 chip, Retina display, and up to 20 hours of battery life for enhanced productivity.', 1375),
  ('48081af7-ad73-46af-a58b-b460e208913f', 'Samsung Galaxy Book Pro', 'Samsung Galaxy Book Pro with AMOLED display, wireless connection features, and SmartThings integration for seamless control.', 899),
  ('3c3c74a4-94a4-4db3-a4b1-4d2b00d33d13', 'Apple iPhone 14', 'Durable iPhone 14 with aerospace-grade aluminum body, Ceramic Shield display, and A15 Bionic processor for superior performance.', 1087),
  ('04cb1dba-8547-45a3-9303-0fba31e92830', 'Apple iPad 10', 'All-new iPad with 10.9-inch Liquid Retina display, A14 Bionic chip, and Apple Pencil support for versatile productivity.', 847),
  ('0bcdd834-9714-4d4b-bbed-c910f42ddaa4', 'HP Victus 16-e0151ur', 'HP Victus 16 gaming laptop with 16.1-inch screen, AMD Ryzen 5 5600H processor, and NVIDIA GeForce RTX 3050 for immersive gaming.', 1099),
  ('7b1ee344-7172-4da6-b028-1059d120ecb5', 'Realme 9 Pro+', 'Realme 9 Pro+ smartphone with 50+8+4MP cameras, Super AMOLED display, and 4500mAh battery for a great mobile experience.', 368),
  ('e8a0ef16-3389-4a79-b9b8-d3e0b2ec68b2', 'Xiaomi Redmi Watch 2', 'Xiaomi Redmi Watch 2 with 100+ workout modes, multiple watch faces, and trendy design for fitness enthusiasts.', 70),
  ('dffc65a6-c929-4099-82be-d6a1fe20c28a', 'Huawei MatePad Pro', 'Huawei MatePad Pro with nature-inspired color design, compact and lightweight build, and hidden antenna for a sleek look.', 707),
  ('0ff4203f-54c8-4336-b5cd-e4b06b7da008', 'MSI Pro AP241', 'MSI Pro AP241 All-in-One PC with powerful processing, ergonomic 23.8-inch screen, and anti-flicker technology for enhanced comfort.', 1681);

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
  products.id AS product_id,
  floor(random() * 5 + 1) AS count
FROM carts
JOIN users ON carts.user_id = users.id
JOIN products ON true;

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
