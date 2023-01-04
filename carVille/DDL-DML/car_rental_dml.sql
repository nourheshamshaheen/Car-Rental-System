USE CAR_RENTAL_SYSTEM;


-- Add 10 offices all around the world
INSERT INTO OFFICE (`address`, city, country) 
VALUES('6 Batlaimous Street, Sidi Gaber', 'Alexandria', 'Egypt');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('31 Nile Street, Sheikh Zayed', 'Cairo', 'Egypt');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('54 Rue de Fleurs, 3e Arrondissement', 'Paris', 'France');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('34 Lionel Messi Street', 'Buenos Aires', 'Argentina');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('66 Zeftawy Street', 'Montreal', 'Canada');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('42 Wallaby Way', 'Sydney', 'Australia');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('20 Cooper Square', 'New York', 'USA');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('738 Frederick Street', 'Louisville', 'USA');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('88 Lara Street', 'Beirut', 'Lebanon');
INSERT INTO OFFICE (`address`, city, country) 
VALUES('70 Casa de Papel Street', 'Barcelona', 'Spain');


-- Add 20 car models
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Nissan', 'Sunny', 2017);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Suzuki', 'Alto', 2004);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Kia', 'Sportage', 2020);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Audi', 'A5', 2018);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Mitsubishi', 'Puma', 2009);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Mercedes', 'C180', 2014);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Skoda', 'Octavia', 2011);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Seat', 'Leon', 2019);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Skoda', 'Superb', 2006);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Mitsubishi', 'Eclipse', 2021);

INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Jeep', 'Cherokee', 2021);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Honda', 'Civic', 2018);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Toyota', 'Corolla', 2020);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Kia', 'Picanto', 2018);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Renault', 'Logan', 2009);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Chery', 'Envy', 2014);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Mazda', 'CX-3', 2011);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Ford', 'Maverick', 2019);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('BMW', 'X6', 2020);
INSERT INTO MODEL (brand, `type`, `year`)
VALUES ('Tesla', 'Model Y', 2021);


-- Add 50 cars
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('111 Mina', 600, 'red', 20, 2, 0, 3.5 ,'Transmission - Continuously Variable Automatic. Engine - 2.4L I-4 cylinder.', 'https://bit.ly/3jtlLe5');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('121 ABC', 700, '#FFD700', 5, 1, 0, 4, 'Leather Upholstery. Exterior Parking Camera Right. Front hiproom: 54.5".', 'https://bit.ly/3I0IyIe');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('321 ADC', 800, 'green', 20, 6, 0, 5, 'Fuel economy highway: 34mpg. Low tire pressure warning. Curb weight: 3,457lbs.', 'https://bit.ly/3BWmyKX');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('456 BRE', 1000, 'blue', 4, 8, 0, 4.5, 'Continuously variable automatic transmission with mode select. Engine horsepower: 185hp @ 6,400RPM.','https://bit.ly/3YLQuTL');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('897 RET', 1100, '#C0C0C0', 13, 9, 0, 3, 'Interior maximum cargo volume: 71 cubit feet. Right camera for exterior parking.', 'https://bit.ly/3WBi9VO');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('999 SDE', 500, 'black', 16, 2, 0, 4, 'Engine horsepower: 185hp @ 6,400RPM. Bluetooth HandsFreeLink wireless phone connectivity.', 'https://bit.ly/3BWo67J');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('888 RFD', 1300, 'red', 18, 3, 0, 5, 'Passenger volume: 101.5 cubic feet. Outside temperature display. Wheelbase: 103.1"', 'https://bit.ly/3YN7XuW');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('777 TYT', 700, 'black', 1, 4, 0, 2.5, 'Rear window wiper. 4-wheel disc brakes. Engine bore x stroke: 3.43" x 3.90".', 'https://bit.ly/3hQ0kTU');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('666 BTW', 860, 'blue', 2, 5, 0, 4.5, 'Engine torque: 181 lb.-ft. @ 3,900RPM. Turning radius: 18.7". Delay-off headlights.', 'https://bit.ly/3FTDPpk');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('555 SMH', 540, '#C0C0C0', 5, 6, 0, 3, 'Roadside Assistance for the duration of the Certified Pre-Owned Limited Warranty.', 'https://bit.ly/3FX99Ud');

INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('444 LOL', 730, 'black', 6, 7, 0, 4, 'Occupant sensing airbag. 182 Point Inspection. Front legroom: 41.3".', 'https://bit.ly/3GfwUbk');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('333 POU', 900, '#A47551', 7, 8, 0, 3, 'Powertrain Limited Warranty: 84 Month/100,000 Mile (whichever comes first) from original in-service date.', 'https://bit.ly/3GiccaC');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('222 HEN', 910, 'blue', 8, 9, 1, 5, 'Security system. Variably intermittent wipers. Engine horsepower: 185hp @ 6,400RPM.', 'https://bit.ly/3YPgLjX');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('111 NOR', 1600, '#C0C0C0', 9, 9, 0, 3.5, 'Towing capacity: 1,500lbs. Engine bore x stroke: 3.43" x 3.90". Read camera for exterior parking.', 'https://bit.ly/3hUdXl5');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('123 SORS', 1450, 'black', 10, 10, 0, 2, 'Occupant sensing airbag. Front headroom: 38.0". Engine displacement: 2.4 L.', 'https://bit.ly/3I2mEEI');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('451 SKR', 670, 'red', 11, 10, 0, 5, 'Front fog lights. Dual front side impact airbags. Interior maximum cargo volume: 71 cubit feet.', 'https://bit.ly/3BYRWbu');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('671 BRD', 450, 'green', 12, 1, 0, 4.5, 'Engine torque: 181 lb.-ft. @ 3,900RPM. Engine bore x stroke: 3.43" x 3.90".', 'https://bit.ly/3Gfpd4X');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('891 HAR', 670, 'blue', 13, 2, 0, 3, 'Engine horsepower: 185hp @ 6,400RPM. Outside temperature display. Trip computer.', 'https://bit.ly/3hSE2AU');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('567 SAA', 920, '#FFD700', 14, 2, 0, 5, 'Powertrain Limited Warranty: 84 Month/100,000 Mile (whichever comes first) from original in-service date.', 'https://bit.ly/3VjmM5v');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('789 SAB', 690, 'red', 15, 3, 0, 2.5, 'Roadside Assistance for the duration of the Certified Pre-Owned Limited Warranty.', 'https://bit.ly/3FUC6jr');

INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('234 DAB', 590, '#FFD700', 16, 3, 0, 5, 'Interior cargo volume: 35 cubic feet. Read camera for exterior parking. Wheelbase: 103.1".', 'https://bit.ly/3WL9Bf4');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('345 CAD', 1620, 'red', 17, 4, 0, 3, 'New Arrival- Navigation System, Entertainment System, Sunroof / Moonroof, Satellite Radio, and Parking Sensors.', 'https://bit.ly/3vgGt3n');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('456 NOF', 1700, '#C0C0C0', 18, 4, 1, 4, 'Carfax One Owner- This Crystal Black Pearl 2014 Acura MDX Advance/Entertainment Pkg is priced to sell fast!', 'https://bit.ly/3C0ELXI');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('567 TOR', 1250, 'white', 19, 5, 2, 2, 'Right camera for exterior parking. Interior maximum cargo volume: 71 cubit feet.', 'https://bit.ly/3veJb9t');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('678 WEN', 1300, 'red', 1, 5, 0, 4, 'Rear shoulder room: 56.4". Passenger volume: 101.5 cubic feet. Dual front side impact airbags.', 'https://bit.ly/3Gfqs47');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('789 DDD', 560, 'black', 2, 6, 0, 5, 'Ignition disabler. Speed sensitive wipers. Towing capacity: 1,500lbs.', 'https://bit.ly/3vhbNPB');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('980 RKL', 880, 'black', 3, 6, 0, 5, 'Passenger volume: 101.5 cubic feet. Front fog lights. Rear shoulder room: 56.4".', 'https://bit.ly/3Ijz0IP');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('134 AAA', 960, 'white', 4, 7, 0, 3.5, 'Variably intermittent wipers. Engine bore x stroke: 3.43" x 3.90".', 'https://bit.ly/3hUuXry');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('189 BBB', 650, 'blue', 5, 7, 0, 4, 'Turning radius: 18.7". Wheelbase: 103.1". Read camera for exterior parking.', 'https://bit.ly/3PUAMSd');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('561 CCC', 660, 'white', 6, 8, 0, 3.5, 'Speed sensitive wipers. Engine horsepower: 185hp @ 6,400RPM. Analog display.', 'https://bit.ly/3VpkEsU');

INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('099 DDD', 590, 'orange', 7, 8, 0, 3, 'Rear window defroster. Dual front side impact airbags. Rear headroom: 38.6".', 'https://bit.ly/3jrCe2j');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('795 EEE', 890, 'white', 8, 9, 0, 4, 'Has tons of extras and advanced features like hands-free Bluetooth, sunroof/moonroof and a rearview camera.', 'https://bit.ly/3Gi7HNi');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('589 FED', 930, 'red', 9, 9, 0, 5, 'Leather upholstery and expertly appointed cabin gives this compact SUV an upscale feel.', 'https://bit.ly/3vjf0ye');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('543 POR', 1150, 'black', 10, 10, 0, 4, 'Only one owner with a super clean Carfax. New tires just installed. Wheelbase: 103.1".', 'https://bit.ly/3HXfVMd');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('5211 DOR', 1240, 'blue', 11, 2, 0, 2.5, 'Powertrain Limited Warranty: 84 Month/100,000 Mile (whichever comes first) from original in-service date.', 'https://bit.ly/3hVV9ll');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('5430 WED', 1340, '#C0C0C0', 12, 2, 0, 4, 'Security system. Passenger volume: 101.5 cubic feet. Dual front side impact airbags.', 'https://bit.ly/3vf7ioD');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('652 MID', 1600, '#A47551', 13, 1, 0, 5, 'Roadside Assistance for the duration of the Certified Pre-Owned Limited Warranty.', 'https://bit.ly/3jngdBD');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('765 FRI', 1300, 'green', 14, 2, 0, 1.5, 'Interior maximum cargo volume: 71 cubit feet. Front hiproom: 54.5".', 'https://bit.ly/3I0GD6u');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('887 TUK', 1500, 'red', 15, 2, 0, 5, 'Exterior body width: 71.6". Exterior body width: 71.6". Outside temperature display.', 'https://bit.ly/3hP6gN7');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('542 BOR', 600, 'blue', 16, 3, 0, 4, 'Passenger volume: 101.5 cubic feet. Engine bore x stroke: 3.43" x 3.90". Bucket front seats.', 'https://bit.ly/3hRF93W');

INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('3241 JAN', 610, 'blue', 17, 4, 0, 4.5, 'Power 2-way driver lumbar support. Split-folding rear seat with center armrest.', 'https://bit.ly/3VpcC3l');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('145 FEB', 640, 'white', 18, 4, 0, 5, 'Continuously variable automatic transmission with mode select. Torque: 181 lb.-ft. @ 3,900RPM.', 'https://bit.ly/3VpcNf1');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('176 APR', 460, '#FFD700', 19, 5, 0, 3.5, 'Fuel economy highway: 34mpg. Recommended fuel: Regular Unleaded. Front dual zone A/C.', 'https://bit.ly/3I1JwUT');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('189 MAR', 850, 'green', 20, 5, 0, 4, 'Fuel Economy - 27.0/34.0 mpg City/Hwy. Engine - 2.4L I-4 cylinder. Power moonroof.', 'https://bit.ly/3WJLVHW');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('167 MAY', 900, 'red', 20, 6, 0, 3, 'Speed-Sensitive Windshield Wipers. 1-touch down/up windows. Odometer - 52,315 miles.', 'https://bit.ly/3PPPRo9');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('444 JNA', 1200, 'red', 1, 6, 2, 2, 'Maximum ground clearance 6.4". Steering wheel mounted audio controls. Power driver seat.', 'https://bit.ly/3VoMAx6');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('451 DFG', 1520, 'black', 2, 7, 0, 4, 'Remote keyless entry. Illuminated entry. Fuel Economy - 27.0/34.0 mpg City/Hwy.', 'https://bit.ly/3VnUEhG');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('6781 ART', 1450, 'black', 3, 7, 0, 3, 'Fuel tank capacity: 15.3 gallons. Telescoping steering wheel. Rear beverage holders.', 'https://bit.ly/3ViVNHv');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('1341 SMS', 1700, '#C0C0C0', 19, 8, 0, 5, '7 Speakers. Bluetooth HandsFreeLink wireless phone connectivity. Curb weight: 3,457lbs.', 'https://bit.ly/3Vmv3FV');
INSERT INTO CAR (plate_id, price_per_day, color, model_id, office_id, `status`,rating ,`description`, image_url)
VALUES('1345 GDS', 1500, '#A47551', 18, 8, 1, 2, 'Steering wheel mounted audio controls. Radio data system. Maximum ground clearance 6.4".', 'https://bit.ly/3hYgRFk');





INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('145 FEB', 1, '2022-10-11');
INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('444 JNA', 1, '2020-11-11');
INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('145 FEB', 0, '2022-11-15');
INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('1341 SMS', 1, '2021-10-11');
INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('444 JNA', 0, '2021-11-11');
INSERT INTO StatusLog (plate_id, `status`, date_changed)
VALUES('765 FRI', 1, '2022-12-12');


INSERT INTO USER (fname, lname, email, `password`, gender, dob)
VALUES ('Nour', 'Hesham', 'test@test.com', '$2a$10$87g8bsYxHwj9hzx6YaJV5Ol9ptGE2UFIz9TAF5Dpe3DltDCOW9Hfa', 'F', '2000-10-05');

INSERT INTO RESERVATION (plate_id, user_id, pick_up_date, return_date, payment)
VALUES ('444 JNA',1, '2022-12-05', '2022-12-10', 5000);