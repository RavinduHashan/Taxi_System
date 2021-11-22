create database sahasa_taxi;

create table admins(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    serial_number bigserial,
    username varchar(255) not null,
    admin_password varchar(255) not null,
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone
);

create table customers(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    serial_number bigserial,
    full_name varchar(255),
    email varchar(255),
    phone_number varchar(255) not null,
    city varchar(255),
    otp integer,
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone    
);

create table drivers(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    serial_number bigserial,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    vehicle_type varchar(255) not null references vehicles(vehicle_type),
    vehicle_number varchar(255) not null,
    city varchar(255) not null,
    driver_password varchar(255) not null,
    available boolean DEFAULT false,
    verification varchar(255) not null DEFAULT 'Unverified',
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone
);

create table orders(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    serial_number bigserial,
    pick_location varchar(255) not null,
    drop_location varchar(255) not null,
    distance varchar(255) ,
    pick_time varchar(255) ,
    drop_time varchar(255) ,
    response varchar(255) not null DEFAULT 'Pending',
    customer_id uuid DEFAULT uuid_generate_v4() references customers(id),
    driver_id uuid DEFAULT uuid_generate_v4() references drivers(id),
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone NOT NULL DEFAULT now()
);

create table vehicles(
    id uuid DEFAULT uuid_generate_v4() not null primary key,
    serial_number bigserial,
    vehicle_type varchar(255) not null UNIQUE,
    base_distance varchar(255) not null,
    base_rate varchar(255) not null,
    rate_per_KM varchar(255) not null,
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone 
);

ALTER TABLE public.orders ADD COLUMN created timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE orders ALTER COLUMN response SET DEFAULT 'Pending';

ALTER TABLE orders ALTER COLUMN response TYPE varchar(255) not null;

ALTER TABLE public.customers ADD COLUMN otp default SELECT random_between(1,100);

otp integer not null default random()*(9999-1000)+1000
-- add a colunm
ALTER TABLE customers ADD COLUMN otp serial;

-- change type of a colunm
ALTER TABLE customers ALTER COLUMN otp TYPE integer;

-- cmd command for find the data type of a table
\d+ customers;

-- chnage default value in a colunm
ALTER TABLE customers ALTER COLUMN otp SET DEFAULT 5;

-- PSQL Command ****************************************************************************

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

