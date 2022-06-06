require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const local = require("./passport-config.js");
const passport = require("passport");
const db = require("./database");
const path = require("path");

const store = new session.MemoryStore();
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// enable session middleware so that we have state
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 3000000,
    },
    saveUninitialized: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 24hrs
  max: 1000, // Limit each IP to 1000 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

const speedLimiter = slowDown({
  windowMs: 1000, // 1 second
  delayAfter: 1, // allow 1 requests per 1 second, then...
  delayMs: 500, // begin adding 500ms of delay per request above 1:
  // request # 1 is delayed by  500ms
  // request # 2 is delayed by 1000ms
  // request # 3 is delayed by 1500ms
  // etc.
});

//  apply to all requests
app.use(speedLimiter);

// whitelisting origin to localhost
// Cors locks the domain of the web service to only accept requests from
// the origin domain listed in the corsOptions
app.use(function (req, res, next) {
  var allowedDomains = ["http://localhost:3000", "http://localhost:8080"];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUSH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// request logging middleware
// Every time a request is made this middleware runs logging the
// users IP address, sessionID, what method the request was, and
// the URL of the request. Additionally logging the email address
// of the user if logged in. A current timestamp is also logged
// in the database every time an entry is made on the table.

const logRoute = require("./routes/log.js");
app.use((req, res, next) => {
  let userLoggedIn = req.user != null;
  if (userLoggedIn === true) {
    logRoute.addLog(
      req.ip,
      req.sessionID,
      req.method,
      req.url,
      req.user[0].userId
    );
    next();
  } else {
    logRoute.addLog(req.ip, req.sessionID, req.method, req.url);
    next();
  }
});

app.use(express.static("frontend"));
app.use(express.static("admin"));

// links to all routes
const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

const authRoute = require("./routes/auth.js");
app.use("/auth", authRoute);

const logoutRoute = require("./routes/logout.js");
app.use("/logout", logoutRoute);

const classRoutes = require("./routes/classes.js");
app.use("/classes", classRoutes);

const bookingRoutes = require("./routes/bookings.js");
app.use("/bookings", bookingRoutes);

const specialRoutes = require("./routes/special-occasions.js");
app.use("/special", specialRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});
app.get("/class-list", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "classes.html"));
});
app.get("/login", checkNotAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});
app.get("/register", checkNotAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "register.html"));
});
app.get("/special-occasions", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "special-occasions.html"));
});
app.get("/settings", checkAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "settings.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "contact.html"));
});
app.get("/your-classes", checkAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "your-classes.html"));
});
app.get("/booking", checkAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "bookings.html"));
});
app.get("/cancel", checkAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "cancel-booking.html"));
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }
}

function checkNotAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return false if user is not logged in
    res.redirect("/");
  }
  next();
}
function checkNotAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user[0].accountLevel == "Admin")
    return next();
  else res.status(401).json("test");
}

const adminRoute = require("./routes/admin.js");
app.use("/admin", adminRoute);
app.get("/admin/*", checkNotAdmin, (req, res) => {
  res.status(401);
});

// server starting message
app.listen(port, () =>
  console.log(`server running on port: http://localhost:${port}`)
);
