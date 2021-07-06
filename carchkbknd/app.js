const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));

// api routes
app.get("/status", (req, res) => {
  res.send({
    message: 'Hello World'
  })
});
app.use("/users", require("./services/users.service"));
app.use("/", (req, res) => {
  return res.send("Hello! RNR from sample Node JS API");
});

// start server
const port = 8081;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
