const db = require("../database");

module.exports.addLog = (ip, method, url) => {
  return db.query(
    `INSERT INTO logging (ip, method, url)
    VALUES (?, ?, ?)`,
    [ip, method, url]
  );
};
