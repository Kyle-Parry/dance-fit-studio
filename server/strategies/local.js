const LocalStrategy = require("passport-local");
const passport = require("passport");
const db = require("../database");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, { username: user.username });
});

passport.deserializeUser(async (username, done) => {
  try {
    const result = await db.query(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
    console.log(result);
    if (result[0][0]) {
      done(null, result[0][0]);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await db.query(
        `SELECT username, password FROM users WHERE username = ?`,
        [username]
      );
      const hash = await bcrypt.hashSync(password, 10);
      const match = await bcrypt.compare(password, hash);
      // console.log(match);
      if (!match) {
        done(null, false);
      } else {
        if (match) {
          done(null, result[0]);
        } else {
          done(null, false);
        }
      }
    } catch (err) {
      done(err, false);
    }
  })
);
