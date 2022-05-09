const db = require("../database");
// logging middleware
module.exports.addLog = (ip, sessionID, method, url, username) => {
  return db.query(
    `INSERT INTO logging (ip, sessionID, method, url, username)
    VALUES (?, ?, ?, ?, ?)`,
    [ip, sessionID, method, url, username]
  );
};
