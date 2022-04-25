const db = require("../database");
// logging middleware
module.exports.addLog = (ip, sessionID, method, url, email) => {
  return db.query(
    `INSERT INTO logging (ip, sessionID, method, url, email)
    VALUES (?, ?, ?, ?, ?)`,
    [ip, sessionID, method, url, email]
  );
};
