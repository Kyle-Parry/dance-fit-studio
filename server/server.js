require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const cors = require("cors");
const local = require("./strategies/local.js");
const passport = require("passport");

const store = new session.MemoryStore();
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// enable session middleware so that we have state
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 6000 },
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
const corsOptions = {
  origin: "localhost",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

// request logging middleware
// Every time a request is made this middleware runs logging the
// users IP address, sessionID, what method the request was, and
// the URL of the request. Additionally logging the email address
// of the user if logged in. A current timestamp is also logged
// in the database every time an entry is made on the table.

const logRoute = require("./routes/log.js");
app.use((req, res, next) => {
  let userLoggedIn = req.session.user != null;
  if (userLoggedIn === true) {
    logRoute.addLog(
      req.ip,
      req.sessionID,
      req.method,
      req.url,
      req.session.user.email
    );
    next();
  } else {
    logRoute.addLog(req.ip, req.sessionID, req.method, req.url);
    next();
  }
});

// links to all routes
const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

const authRoute = require("./routes/auth.js");
app.use("/auth", authRoute);

const classRoutes = require("./routes/classes.js");
app.use("/classes", classRoutes);

const bookingRoutes = require("./routes/bookings.js");
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  console.log("Test!");

  res.send("hello from the other side");
});

// server starting message
app.listen(port, () =>
  console.log(`server running on port: http://localhost:${port}`)
);
