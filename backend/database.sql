create database sahasa_taxi;

create table admins(
    admin_id serial primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    admin_password varchar(255) not null
);

create table users(
    user_id serial primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    user_password varchar(255) not null
);

create table customers(
    customer_id serial primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    customer_password varchar(255) not null
);

create table drivers(
    driver_id serial primary key,
    full_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    vehicle_type varchar(255) not null,
    vehicle_number varchar(255) not null,
    city varchar(255) not null,
    driver_password varchar(255) not null
);

create table orders(
    order_id serial primary key,
    pick_location varchar(255) not null,
    drop_location varchar(255) not null,
    pick_time varchar(255) not null,
    drop_time varchar(255) not null,
    response varchar(255),
    u_id int references users(user_id) not null,
    d_id int references drivers(driver_id) not null
);

create table test_orders(
    test_order_id serial primary key,
    pick_location varchar(255) not null,
    drop_location varchar(255) not null,
    pick_time varchar(255) not null,
    drop_time varchar(255) not null,
    response varchar(255)
);

create table online_drivers(
    online_driver_id serial primary key,
    o_d_id int references drivers(driver_id) not null
);

DROP TABLE users;
