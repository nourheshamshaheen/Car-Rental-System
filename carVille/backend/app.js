const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// FIrst, we start by creating a connection to the database
var mysql = require('mysql');

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: null,
database: "CAR_RENTAL_SYSTEM"

});

con.connect(function (err) {
if (err) throw err;
console.log("SQL Connected!");
});

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors({
credentials: true,
origin: ['http://localhost:8081']
}));


const server = app.listen(PORT, () => {
console.log("Server is running on port", server.address().port);
});


app.post("/signup", async (req, res) => { // receive form data from signup
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(req.body.password, salt);
fname = req.body.fname;
lname = req.body.lname;
email = req.body.email;
password = hashedpassword;
gender = req.body.gender;
dob = req.body.dob;

let date = new Date(dob);

// check if email exists in database, if it does, send to frontend: "Email exists"
q_select = 'SELECT COUNT(email) FROM USER WHERE USER.email = ' + mysql.escape(email) + ';';
con.query(q_select, function (err, result) {
if (err) throw err;
let count = result[0]['COUNT(email)'];
if (count > 0) {
  res.send("Email exists");
  console.log("EMAIL ALREADY EXISTS! Returned message to frontend.")
}
else {
  // const token = jwt.sign({ email: email }, "secret");
  // console.log(token);
  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000
  // });
  res.send("Success");
  // insert new user in database 
  q_insert = 'INSERT INTO USER(fname, lname, email, password, gender, dob) VALUES ('
    + mysql.escape(fname) + ', ' + mysql.escape(lname) + ', '
    + mysql.escape(email) + ', ' + mysql.escape(password) + ', '
    + mysql.escape(gender) + ', ' + mysql.escape(date) + ');'

  con.query(q_insert, function (err, result) {
    if (err) throw err;
  });
}
});
})

app.post("/signin", async (req, res) => { // receive form data from signup
email = req.body.email;
password = req.body.password;

// check if combination of email and password exists in database
q_select = 'SELECT COUNT(*), fname, lname, password FROM USER WHERE USER.email = ' + mysql.escape(email) + ';';
con.query(q_select, async function (err, result) {
if (err) throw err;
let count = result[0]['COUNT(*)'];
let fname = result[0]['fname'];
let lname = result[0]['lname'];
let password = result[0]['password'];
if (count != 1) {
  console.log("Wrong email or password! Returned message to frontend.");
  res.send({ success: false, message: 'Wrong email or password', fname: null, lname: null });
}
else {
  if (! await bcrypt.compare(req.body.password, password)) {
    console.log("Wrong email or password! Returned message to frontend.");
    res.send({ success: false, message: 'Wrong email or password', fname: null, lname: null });
  } else {
    console.log("Signed in!");
    // const token = jwt.sign({ email: email }, "secret");
    // //console.log(token);
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000
    // });
    res.send({ success: true, message: 'Signed in', fname: fname, lname: lname });
  }

}
});
})

app.post("/carPage", (req, res) => {
  plate_id = req.body.plate_id;
  // pick_up_date = req.body.date_from;
  // return_date = req.body.date_to;
  q_validate = 'SELECT pick_up_date, return_date FROM RESERVATION WHERE plate_id = ' + mysql.escape(plate_id) + ';';
  con.query(q_validate,function(err, result) {
    if(err) throw err;
    console.log(result);
    res.send(result);
});

})

function dateToString(item)
{
  pick_up_date = new Date(item['pick_up_date']);
  pick_up_date.setDate(pick_up_date.getDate() + 1);
  pick_up_date = pick_up_date.toJSON().slice(0, 10).toString();
  return_date = new Date(item['return_date']);
  return_date.setDate(return_date.getDate() + 1);
  return_date = return_date.toJSON().slice(0, 10).toString();
  item['pick_up_date'] = pick_up_date;
  item['return_date'] = return_date;
}

app.post("/reservations", (req, res) => {
let email = req.body.email;
console.log(email);
q_user_reservations = 'SELECT reservation_num, pick_up_date, return_date, payment, plate_id, brand, type, year FROM RESERVATION NATURAL JOIN CAR NATURAL JOIN MODEL NATURAL JOIN USER  WHERE email = '
+ mysql.escape(email) + ';';

con.query(q_user_reservations, function (err, result) {
if (err) throw err;
console.log(result);
let columns = result;
columns.forEach(dateToString);
res.send(columns);
});
})

app.get("/browsing", (req, res) => {
// send all cars to frontend
q_select = 'SELECT * FROM CAR NATURAL JOIN OFFICE NATURAL JOIN MODEL;'
con.query(q_select, function (err, result) {
if (err) throw err;
console.log("Cars sent!");
let columns = result;
res.send(columns);
});
})


///////////////////////////////////////
///// FILTRATION /////////////////////
//////////////////////////////////////

app.post("/browsing", (req, res) => {
  color = req.body.color.toLowerCase();
  brand = req.body.brands;
  //type = req.body.type;
  year = req.body.year;
  price_up = req.body.price_up;
  price_down = req.body.price_down;
  addresses = req.body.address;
  addressArr=[];
  let new_address=[];
  console.log(addresses);


  // split address
  for(i=0;i<addresses.length;i++){
    new_address = addresses[i].split(",");
    addressArr.push(new_address[0]);
  }
  console.log(addressArr);
  //console.log(new_address);

  if (!color) { str_color = "AND TRUE " }
  else { 
    let new_color = "";
    if (color == "gold") {new_color = '#FFD700';}
    else if (color == "bronze") {new_color = '#A47551';}
    else if (color == "silver") {new_color = '#C0C0C0';}
    else { new_color = color; } 
  str_color = " AND c.color = " + mysql.escape(new_color) 
  }
  console.log(str_color)

  if (brand.length===0) { str_brand = ' AND TRUE ' }
  else { str_brand = " AND m.brand IN ( " + mysql.escape(brand) + ")" }

  // if (type.length==0) { str_type = "" }
  // else { str_type = " AND m.type = " + mysql.escape(type) }

  if (!year) { str_year = ' AND TRUE' }
  else { str_year = " AND m.year = " + mysql.escape(year) }

  if (!price_up) { str_price_up = " AND TRUE" }
  else { str_price_up = " AND c.price_per_day  <= " + mysql.escape(price_up)}

  if (!price_down) { str_price_down = " AND TRUE" }
  else { str_price_down = " AND c.price_per_day >= " + mysql.escape(price_down)}

  if (addresses.length===0) { str_address = " AND TRUE" }
  else { str_address = " AND o.address IN ( " + mysql.escape(addressArr) +")"}

  
  /*q_select = 'SELECT * FROM CAR AS c NATURAL JOIN OFFICE AS o NATURAL JOIN MODEL AS m WHERE TRUE '
            + mysql.escape(str_color.replace(/^"(.*)"$/, '$1')) + mysql.escape(str_brand.replace(/['"]+/g, '')) + mysql.escape(str_year.replace(/['"]+/g, ''))
            + mysql.escape(str_price_up.replace(/['"]+/g, '')) + mysql.escape(str_price_down.replace(/['"]+/g, ''))  + ';'; */
            q_select = 'SELECT * FROM CAR AS c NATURAL JOIN OFFICE AS o NATURAL JOIN MODEL AS m WHERE TRUE '
            + str_color + str_brand + str_year + str_price_up + str_address + str_price_down  + ';';
  
  con.query(q_select, function (err, result) {
  if (err) throw err;
  console.log("FILTERED");
  let columns = result;
  res.send(columns);
  });
 })
  

app.post("/reserve", (req, res) => {
plate_id = req.body.plate_id;
email = req.body.email;
pick_up_date = req.body.date_from;
return_date = req.body.date_to;

validPromo=req.body.validPromo;
console.log(email);
q_validate = 'SELECT COUNT(plate_id) FROM RESERVATION WHERE plate_id = ' + mysql.escape(plate_id) + ' AND (('
+ mysql.escape(pick_up_date) + 'BETWEEN pick_up_date AND return_date) OR (' + mysql.escape(return_date) + 'BETWEEN pick_up_date AND return_date) OR (pick_up_date >= ' +
  mysql.escape(pick_up_date) + ' AND return_date <= ' + mysql.escape(return_date) + ' ))' + ';'
con.query(q_validate, function (err, result_validate) {
if (err) throw err;
let count = result_validate[0]['COUNT(plate_id)'];
if (count > 0) {
  res.send("Sorry, the selected car is unavailable during this time period.");
  console.log("Date taken");
}
else {
  q_userid = 'SELECT user_id FROM USER WHERE email = ' + mysql.escape(email) + ';';
  con.query(q_userid, function (err, result0) {
    if (err) throw err;
    console.log(result0);
    let user_id = result0[0]['user_id'];


    q_priceperday = 'SELECT price_per_day FROM CAR WHERE plate_id = ' + mysql.escape(plate_id) + ';';
    con.query(q_priceperday, function (err, result) {
      if (err) throw err;
      console.log(result);
      let price_per_day = result[0]['price_per_day'];
      if(validPromo){
        price_per_day=price_per_day*0.9
      }
      q_insert = 'INSERT INTO RESERVATION (plate_id, user_id, pick_up_date, return_date, payment) '
        + 'VALUES ( ' + mysql.escape(plate_id) + ', ' + mysql.escape(user_id) + ', ' + mysql.escape(pick_up_date) + ', '
        + mysql.escape(return_date) + ', ' + mysql.escape(price_per_day) + ' * (1 + abs(datediff(' + mysql.escape(pick_up_date) + ', '
        + mysql.escape(return_date) + '))));';
      con.query(q_insert, function (err, result2) {
        if (err) throw err;
        res.send("Success!");
      });
    });
  });
  }
});
})




///////////////////////////////////
///////// ADMIN STUFF ////////////
///////////////////////////////////

// 1. ADD CAR

function officeToString(item) {
  str = item['address'] + ', ' + item['city'] + ', ' + item['country'];
  item['str'] = str;
}

app.get("/addCar", (req, res) => {
  // get office locations from database
  q_select = 'SELECT * FROM OFFICE;'
  con.query(q_select, function (err, result) {
    if (err) throw err;
    console.log(result);
    let columns = result;
    columns.forEach(officeToString);
    res.send(columns);
  });
})

// app.get("/updateCarStatus",(req, res) => {
//   q_select = 'SELECT DISTINCT STATUS FROM CAR;'
//   con.query(q_select, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     let columns = result;
//     console.log(columns);
//     res.send(columns);
//     });
// })

app.post("/addCar", (req, res) => {
  plate_id = req.body.plate_id;
  price_per_day = req.body.price_per_day;
  color = req.body.color;
  brand = req.body.brand;
  type = req.body.type;
  year = req.body.year;
  office_id = req.body.office_id;
  stat = req.body.stat;
  image_url = req.body.image_url;
  description = req.body.description;

  // check if model exists
  q_select = 'SELECT COUNT(*) FROM MODEL WHERE brand = ' + mysql.escape(brand)
    + 'and type =' + mysql.escape(type) + 'and year =' + mysql.escape(year) + ';';
  con.query(q_select, function (err, result) {
    if (err) throw err;
    let count = result[0]['COUNT(*)'];
    if (count == 0) // add Model to table and get its model_id
    {
      q_insert_model = 'INSERT INTO MODEL(brand, type, year) VALUES ('
        + mysql.escape(brand) + ', ' + mysql.escape(type) + ', '
        + mysql.escape(year) + ');'
      con.query(q_insert_model, function (err, result2) {
        if (err) throw err;
      });
    }
    // GET MODEL_ ID
    q_select_model_id = 'SELECT model_id FROM MODEL WHERE brand = ' + mysql.escape(brand)
      + 'and type =' + mysql.escape(type) + 'and year =' + mysql.escape(year) + ';';

    con.query(q_select_model_id, function (err, result3) {
      if (err) throw err;
      let model_id = result3[0]['model_id'];

      // ADD CAR TO CAR TABLE
      q_insert_car = 'INSERT INTO CAR(plate_id, price_per_day, color, model_id, office_id, description, image_url, status) VALUES ('
        + mysql.escape(plate_id) + ', ' + mysql.escape(price_per_day) + ', ' + mysql.escape(color) + ', '
        + mysql.escape(model_id) + ', ' + mysql.escape(office_id) + ', ' + mysql.escape(description) + ', '
        + mysql.escape(image_url) + ', ' + mysql.escape(stat) + ');';

      con.query(q_insert_car, function (err, result4) {
        if (err) throw err;
        res.send("Car added successfully")
      });
    });
  });
})


// 2. UPDATE CAR STATUS

app.post("/updateCarStatus", (req, res) => {
  plate_id = req.body.plate_id;
  stat = req.body.status;
  let currentDate = new Date().toJSON().slice(0, 10);

  // insert into StatusTable
  q_insert_stat = 'INSERT INTO StatusLog(plate_id, status, date_changed) VALUES ('
    + mysql.escape(plate_id) + ', ' + mysql.escape(stat) + ', ' + mysql.escape(currentDate) + ');';

  con.query(q_insert_stat, function (err, result) {
    if (err) {
      res.send("Car not found");
    }else{
      res.send("Car status updated");
    }
    
  });
})


// 3. ADVANCED SEARCH

function statusToString(item) {
  stat = item['status']
  if (stat == 0) item['status'] = "Active";
  if (stat == 1) item['status'] = "Out Of Order";
  if (stat == 2) item['status'] = "Rented";
}
function dateToString3(item)
{
  date = new Date(item['dob']);
  date.setDate(date.getDate() + 1);
  date = date.toJSON().slice(0, 10).toString();
  item['dob'] = date;
}

app.post("/advancedSearch", (req, res) => {
  customer = req.body.customer;
  car = req.body.car;
  reservations = req.body.reservations;

  if (customer == true && car == false && reservations == false) {
    q_customer = 'SELECT user_id, fname, lname, email, gender, dob FROM USER;';

    con.query(q_customer, function (err, result) {
      if (err) throw err;
      console.log(result);
      result.forEach(dateToString3)
      res.send(result);
    });
  }
  else if (customer == false && car == true && reservations == false) {
    q_car = 'SELECT plate_id, price_per_day, color, brand, `type`, `year`, `description`, `address`, city, country, `status`, rating '
      + 'FROM CAR NATURAL JOIN OFFICE NATURAL JOIN MODEL;';

    con.query(q_car, function (err, result) {
      if (err) throw err;
      columns = result
      columns.forEach(statusToString)
      res.send(columns);
    });
  }
  else if (customer == false && car == false && reservations == true) {
    // q_reserve = 'SELECT reservation_num, pick_up_date, return_date, payment, plate_id, price_per_day, color, brand, `type`, `year`, `description`, `address`, city, country, `status`, rating, '
    //       + 'user_id, fname, lname, email, gender, dob '
    //       + 'FROM RESERVATION NATURAL JOIN CAR NATURAL JOIN OFFICE NATURAL JOIN MODEL NATURAL JOIN USER;';
    q_reserve = 'SELECT reservation_num, pick_up_date, return_date, payment, plate_id,user_id FROM RESERVATION;';
    con.query(q_reserve, function (err, result) {
      if (err) throw err;
      columns = result;
      columns.forEach(dateToString);
      columns.forEach(statusToString);
      res.send(columns);
    });
  }
  else if (customer == false && car == true && reservations == true) {
    // q_reserve_car = 'SELECT r.reservation_num, r.pick_up_date, r.return_date, r.payment, c.plate_id, c.price_per_day, c.color, m.brand, m.`type`, m.`year`, c.`description`, o.`address`, o.city, o.country, '
    // + 'c.`status`, c.rating, u.user_id, u.fname, u.lname, u.email, u.gender, u.dob FROM RESERVATION AS r RIGHT JOIN CAR as c on r.plate_id = c.plate_id LEFT JOIN OFFICE as o on c.office_id = o.office_id '
    // + 'LEFT JOIN MODEL AS m on m.model_id = c.model_id LEFT JOIN USER as u on r.user_id = u.user_id;';
    q_reserve_car = 'SELECT r.reservation_num,r.user_id, r.pick_up_date, r.return_date, r.payment, c.plate_id, c.price_per_day, c.color, m.brand, m.`type`, m.`year`, c.`description`, o.`address`, o.city, o.country, '
      + 'c.`status`, c.rating FROM RESERVATION AS r RIGHT JOIN CAR as c on r.plate_id = c.plate_id LEFT JOIN OFFICE as o on c.office_id = o.office_id '
      + 'LEFT JOIN MODEL AS m on m.model_id = c.model_id ;';
    con.query(q_reserve_car, function (err, result) {
      if (err) throw err;
      columns = result;
      columns.forEach(dateToString);
      columns.forEach(statusToString);
      res.send(columns);
    });
  }
  else if (customer == true && car == false && reservations == true) {
    // q_reserve_cust = 'SELECT r.reservation_num, r.pick_up_date, r.return_date, r.payment, c.plate_id, c.price_per_day, c.color, m.brand, m.`type`, m.`year`, c.`description`, o.`address`, o.city, o.country, '
    // + 'c.`status`, c.rating, u.user_id, u.fname, u.lname, u.email, u.gender, u.dob FROM RESERVATION AS r RIGHT JOIN USER as u on r.user_id = u.user_id LEFT JOIN CAR AS c on r.plate_id = c.plate_id '
    // + 'LEFT JOIN OFFICE as o on c.office_id = o.office_id LEFT JOIN MODEL AS m on m.model_id = c.model_id;';
    q_reserve_cust = 'SELECT r.reservation_num, r.pick_up_date, r.return_date, r.payment, r.plate_id,u.user_id, u.fname, u.lname, u.email, u.gender, u.dob FROM RESERVATION AS r RIGHT JOIN USER as u on r.user_id = u.user_id ;';
    con.query(q_reserve_cust, function (err, result) {
      if (err) throw err;
      columns = result;
      columns.forEach(dateToString);
      columns.forEach(statusToString);
      columns.forEach(dateToString3);
      res.send(columns);
    });
  }
  else if (customer == true && car == true && reservations == false) {
    // error 
  }
  else if (customer == true && car == true && reservations == true) {
    q_reserve_cust_car = 'SELECT r.reservation_num, r.pick_up_date, r.return_date, r.payment, c.plate_id, c.price_per_day, c.color, m.brand, m.`type`, m.`year`, c.`description`, o.`address`, o.city, o.country, '
      + 'c.`status`, c.rating, u.user_id, u.fname, u.lname, u.email, u.gender, u.dob FROM RESERVATION AS r RIGHT JOIN CAR as c on r.plate_id = c.plate_id LEFT JOIN OFFICE as o on c.office_id = o.office_id '
      + 'LEFT JOIN MODEL AS m on m.model_id = c.model_id LEFT JOIN USER as u on r.user_id = u.user_id UNION SELECT r.reservation_num, r.pick_up_date, r.return_date, r.payment, c.plate_id, c.price_per_day, c.color, '
      + 'm.brand, m.`type`, m.`year`, c.`description`, o.`address`, o.city, o.country, c.`status`, c.rating, u.user_id, u.fname, u.lname, u.email, u.gender, u.dob FROM RESERVATION AS r RIGHT JOIN USER as u on '
      + 'r.user_id = u.user_id LEFT JOIN CAR AS c on r.plate_id = c.plate_id LEFT JOIN OFFICE as o on c.office_id = o.office_id LEFT JOIN MODEL AS m on m.model_id = c.model_id;';

    con.query(q_reserve_cust_car, function (err, result) {
      if (err) throw err;
      columns = result;
      columns.forEach(dateToString);
      columns.forEach(dateToString3);
      columns.forEach(statusToString);
      res.send(columns);
    });

  }
  //////
})

////////////////////////////////////////////
/////////////// REPORTS ////////////////////
////////////////////////////////////////////


/// 1. STATUS OF ALL CARS ON A SPECIFIC DAY

app.post("/CarStatus", (req, res) => {
  date = req.body.date;

  // get status of all plate ids
  // first part of query: get closest (floor) status to input date of a plate_id
  // second part of query: get statuses of cars that haven't been updated
  q_select_stat =
    'WITH cte AS (' +
    'SELECT plate_id, `status`, ROW_NUMBER() OVER (PARTITION BY plate_id ORDER BY -1 * abs(datediff(date_changed, ' + mysql.escape(date) +
    ')) DESC) AS rn' +
    ' FROM StatusLog)' +
    'SELECT plate_id, `status` FROM cte WHERE rn = 1 ' +
    'UNION ' +
    'SELECT plate_id, `status` FROM CAR WHERE plate_id NOT IN (SELECT plate_id FROM StatusLog WHERE date_changed <=' + mysql.escape(date) + ');';

  con.query(q_select_stat, function (err, result) {
    if (err) throw err;
    columns = result
    columns.forEach(statusToString)
    res.send(columns);
  });
})


// 2. DAILY PAYMENTS WITHIN A SPECIFIC PERIOD
function dateToString2(item)
{
  date = new Date(item['pick_up_date']);
  date.setDate(date.getDate() + 1);
  date = date.toJSON().slice(0, 10).toString();
  item['pick_up_date'] = date;
}


app.post("/dailyPayments", (req, res) => {
  date_from = req.body.date_from;
  date_to = req.body.date_to;


  q_select_payments = 'SELECT pick_up_date, SUM(payment) AS TOTAL FROM RESERVATION WHERE pick_up_date >= '
    + mysql.escape(date_from) + ' AND pick_up_date <= ' + mysql.escape(date_to) + ' GROUP BY pick_up_date;';
  con.query(q_select_payments, function (err, result) {
    if (err) throw err;
    let columns = result;
    columns.forEach(dateToString2);
    res.send(columns);    
  });
})

// 3. ALL CUSTOMER'S RESERVATIONS 

function dobToString(item)
{
  date = new Date(item['dob']);
  date.setDate(date.getDate() + 1);
  date = date.toJSON().slice(0, 10).toString();
  item['dob'] = date;
}


app.post("/customerInfo", (req, res) => {
  user_id = req.body.user_id;
  q_select_reservations = 'SELECT fname, lname, email, gender, dob, plate_id, brand, type, year, pick_up_date, return_date, reservation_num, payment FROM USER NATURAL JOIN RESERVATION NATURAL JOIN CAR NATURAL JOIN MODEL WHERE user_id = '
    + mysql.escape(user_id);
  con.query(q_select_reservations, function (err, result) {
    if (err) throw err;
    columns = result;
    columns.forEach(dobToString);
    columns.forEach(dateToString);
    columns.forEach(statusToString);
    res.send(columns);
  });

})

//4. RESERVATIONS OF A CAR WITHIN IN A SPECIFIC PERIOD
app.post("/reservedCar", (req, res) => {
  plate_id = req.body.plate_id;
  date_from = req.body.date_from;
  date_to = req.body.date_to;
  q_select_car_reservations = 'SELECT plate_id, price_per_day, color, description, `status`, brand, type, year, `address`, city, country, user_id, pick_up_date, return_date, reservation_num, payment FROM CAR NATURAL JOIN MODEL NATURAL JOIN OFFICE NATURAL JOIN RESERVATION WHERE pick_up_date BETWEEN'
    + mysql.escape(date_from) + 'AND' + mysql.escape(date_to) + 'AND plate_id = ' + mysql.escape(plate_id) + ';';

  con.query(q_select_car_reservations, function (err, result) {
    if (err) throw err;
    columns = result;
    columns.forEach(dateToString);
    columns.forEach(statusToString);
    res.send(columns);
  });


})

// 5. RESERVATIONS WITHIN IN A SPECIFIC PERIOD
app.post("/periodInfo", (req, res) => {
  date_from = req.body.date_from;
  date_to = req.body.date_to;
  q_select_car_reservations = 'SELECT plate_id, price_per_day, color, description, `status`, brand, type, year, `address`, city, country, user_id, pick_up_date, return_date, reservation_num, payment, fname, lname, email, gender, dob FROM RESERVATION NATURAL JOIN CAR NATURAL JOIN OFFICE NATURAL JOIN MODEL NATURAL JOIN USER WHERE pick_up_date BETWEEN'
    + mysql.escape(date_from) + 'AND' + mysql.escape(date_to) + ';';

  con.query(q_select_car_reservations, function (err, result) {
    if (err) throw err;
    columns = result;
    columns.forEach(dobToString);
    columns.forEach(statusToString);
    columns.forEach(dateToString);
    res.send(columns);
  });
})
