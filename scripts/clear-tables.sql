-- Disable foreign key checks temporarily
SET CONSTRAINTS ALL DEFERRED;

-- Delete data from child tables first
DELETE FROM cart_items;

-- Delete data from parent tables
DELETE FROM orders;
DELETE FROM carts;
DELETE FROM users;

-- Enable foreign key checks again
SET CONSTRAINTS ALL IMMEDIATE;
