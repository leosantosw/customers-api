CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS customers_coordinates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  coordinate_x FLOAT,
  coordinate_y FLOAT
);
