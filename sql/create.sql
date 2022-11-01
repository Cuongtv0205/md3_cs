CREATE DATABASE homestay_database;
use homestay_database;

create table homestay (
                          id int not null primary key auto_increment,
                          name varchar(255),
                          idCity int,
                          foreign key (idCity) references city(id),
                          bedroomNumber int not null ,
                          price int not null ,
                          toiletNumber int not null ,
                          descripttion varchar(255)
);

create table city(
                     id int not null primary key auto_increment,
                     name varchar(255)
);


select * from city;


select * from homestay;


