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
  "user",
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

// When details are entered into the admin panel's login page
// passport js will run its normal authentication process
// first checking if a user exists with that email, then
// if it gets a response it will compare hashed passwords
// with Bcrypt, if that is also a match it will then check
// is the user in the response also has the "Admin" role.
// If an admin role is found it will let the user through
// and if no admin role is found it will return a false
// not letting the user through.
passport.use(
  "admin",
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
          if (match && user[0].accountLevel === "Admin") {
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
