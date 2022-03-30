require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(
  session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

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
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

//  apply to all requests
app.use(speedLimiter);

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//not working properly
// app.use(cors(corsOptions), function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for only localhost:8080." });
// });

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

const classRoutes = require("./routes/classes.js");
app.use("/classes", classRoutes);

const bookingRoutes = require("./routes/bookings.js");
app.use("/classes", bookingRoutes);

app.get("/", (req, res) => {
  console.log("Test!");

  res.send("hello from the other side");
});

app.listen(port, () =>
  console.log(`server running on port: http://localhost:${port}`)
);
