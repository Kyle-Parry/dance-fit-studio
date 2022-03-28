// import mysql2 module so that we can talk to the database
const mysql = require("mysql2");

// create a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dance_fit_studio",
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
