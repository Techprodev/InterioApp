const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {sequelize} = require('./src/models')
const config = require('./src/config/config')

const app = express();
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./src/routes') (app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log('Server listening on port  + ${config.port}' )
  })
