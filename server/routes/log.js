const db = require("../database");
// logging middleware
module.exports.addLog = (ip, sessionID, method, url, userId) => {
  return db.query(
    `INSERT INTO logging (ip, sessionID, method, url, userId)
    VALUES (?, ?, ?, ?, ?)`,
    [ip, sessionID, method, url, userId]
  );
};
