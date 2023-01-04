DROP DATABASE CAR_RENTAL_SYSTEM;
CREATE DATABASE CAR_RENTAL_SYSTEM;
USE CAR_RENTAL_SYSTEM;


CREATE TABLE OFFICE (
    office_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `address` VARCHAR(100),
    city VARCHAR(50),
    country VARCHAR(50)
);

CREATE TABLE MODEL (
    model_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(20), -- Kia, Nissan, Toyota, ...etc.
    `type` VARCHAR(20), -- Sportage, Sunny, ...etc.
    `year` INT 
);

CREATE TABLE CAR (
    plate_id VARCHAR(10) PRIMARY KEY,
    price_per_day FLOAT,
    color VARCHAR(10),
    model_id INT UNSIGNED,
    office_id INT UNSIGNED,
    `description` VARCHAR(200),
    image_url VARCHAR(200),
    `status` INT, -- here, status is either Active (0), Out of Order (1), Rented (2)
    rating FLOAT(3,1)
);

CREATE TABLE USER (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    fname VARCHAR(20),
    lname VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    `password` VARCHAR(100),
    gender CHAR(1), -- can be F or M
    dob DATE
);

CREATE TABLE RESERVATION (
    plate_id VARCHAR(10),
    user_id INT UNSIGNED,
    pick_up_date DATE,
    return_date DATE,
    reservation_num INT UNIQUE AUTO_INCREMENT,
    payment FLOAT,
    constraint keying PRIMARY KEY (plate_id, user_id, reservation_num)
);

CREATE TABLE StatusLog (
    plate_id VARCHAR(10),
    `status` INT,
    date_changed DATE
);

ALTER TABLE CAR ADD FOREIGN KEY (model_id) REFERENCES MODEL (model_id);
ALTER TABLE CAR ADD FOREIGN KEY (office_id) REFERENCES OFFICE (office_id);
ALTER TABLE RESERVATION ADD FOREIGN KEY (plate_id) REFERENCES CAR (plate_id);
ALTER TABLE RESERVATION ADD FOREIGN KEY (user_id) REFERENCES USER (user_id);
ALTER TABLE StatusLog ADD FOREIGN KEY (plate_id) REFERENCES CAR (plate_id);

