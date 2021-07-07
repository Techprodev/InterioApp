const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// api routes
app.get('/status', (req, res) => {
  res.send({
    message: 'Hello World'
  })
});

app.post('/register', (req, res) => {
  res.send({
    message: 'Hello ${req.body.email}! your user was registered!'
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
