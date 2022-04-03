const db = require("../database");
// logging middleware
module.exports.addLog = (ip, method, url) => {
  return db.query(
    `INSERT INTO logging (ip, method, url)
    VALUES (?, ?, ?)`,
    [ip, method, url]
  );
};
