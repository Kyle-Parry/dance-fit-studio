const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("Test!");

  res.send("hello from the other side");
});

app.listen(PORT, () =>
  console.log(`server running on port: http://localhost:${PORT}`)
);
