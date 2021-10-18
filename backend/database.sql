create database sahasa_taxi;

-- create table users(
--     user_id serial primary key,
--     full_name varchar(255) not null,
--     email varchar(255) not null,
--     phone_number varchar(255) not null,
--     city varchar(255) not null,
--     user_password varchar(255) not null
-- );
create table admins(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    admin_password varchar(255) not null
);

-- create table customers(
--     customer_id serial primary key,
--     full_name varchar(255) not null,
--     email varchar(255) not null,
--     phone_number varchar(255) not null,
--     city varchar(255) not null,
--     customer_password varchar(255) not null
-- );

create table customers(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    customer_password varchar(255) not null
);

-- create table drivers(
--     driver_id serial primary key,
--     full_name varchar(255) not null,
--     email varchar(255) not null,
--     phone_number varchar(255) not null,
--     vehicle_type varchar(255) not null,
--     vehicle_number varchar(255) not null,
--     city varchar(255) not null,
--     driver_password varchar(255) not null
-- );

create table drivers(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    vehicle_type varchar(255) not null,
    vehicle_number varchar(255) not null,
    city varchar(255) not null,
    driver_password varchar(255) not null,
    available boolean DEFAULT false
);

-- create table orders(
--     order_id serial primary key,
--     pick_location varchar(255) not null,
--     drop_location varchar(255) not null,
--     pick_time varchar(255) not null,
--     drop_time varchar(255) not null,
--     response varchar(255),
--     u_id int references users(user_id) not null,
--     d_id int references drivers(driver_id) not null
-- );

create table orders(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    pick_location varchar(255) not null,
    drop_location varchar(255) not null,
    pick_time varchar(255) not null,
    drop_time varchar(255) not null,
    response varchar(255),
    customer_id uuid DEFAULT uuid_generate_v4() references customers(id),
    driver_id uuid DEFAULT uuid_generate_v4() references drivers(id)
);

-- create table online_drivers(
--     online_driver_id serial primary key,
--     o_d_id int references drivers(driver_id) not null
-- );

DROP TABLE users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM mytable
WHERE column1 LIKE '%word1%'
  AND column1 LIKE '%word2%'
  AND column1 LIKE '%word3%'

select 
id, 
pick_location, 
drop_location, 
pick_time, 
drop_time, 
response, 
created,
customer_id,
driver_id,
(SELECT full_name FROM customers WHERE id = customer_id) AS customer_name, 
(SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
from orders ;

ALTER TABLE public.orders ADD COLUMN created timestamp with time zone NOT NULL DEFAULT now();