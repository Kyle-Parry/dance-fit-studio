const LocalStrategy = require("passport-local");
const passport = require("passport");
const db = require("../database");
const bcrypt = require("bcrypt");

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await db.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (result[0][0]) {
      done(null, result[0][0]);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result = await db.query(
          `SELECT email, password FROM users WHERE email = ?`,
          [email]
        );
        if (result[0].length === 0) {
          done(null, false);
        } else {
          if (result[0].password === password) {
            done(null, result[0]);
          } else {
            done(null, false);
          }
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);
