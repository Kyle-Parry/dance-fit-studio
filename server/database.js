require("dotenv").config();
// import mysql2 module so that we can talk to the database
const mysql = require("mysql2");

// create a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123",
  database: "dance_fit_studio",
});

// not working properly
// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected as ID: " + connection.threadId);
});

// this wrapper will allow the use of promise functions
// like .then() and .catch() so that we can use it in a async
// way along with expressJS.
const query = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, parameters, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// export the new query function so that the models can use it
module.exports = {
  query,
};
