const LocalStrategy = require("passport-local");
const passport = require("passport");
const db = require("./database");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.query(`SELECT * FROM users WHERE userId = ?`, [
      userId,
    ]);
    if (!user) throw new Error("User not Found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await db.query(`SELECT * FROM users WHERE email = ?`, [
          email,
        ]);
        const match = await bcrypt.compare(password, user[0].password);
        // console.log(match);
        if (user[0].length === 0) {
          done(null, false);
        } else {
          if (match) {
            done(null, user[0]);
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
