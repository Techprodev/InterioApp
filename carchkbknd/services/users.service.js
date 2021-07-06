const express = require("express");
const router = express.Router();
const config = require("../common/config/config.json");
const tables = require("../helpers/tableNames.js");
const tablecols = require("../helpers/tableColumns.js");
const fndb = require("../helpers/dbFunctions.js");
const jwt = require("jsonwebtoken");

router.post("/registerUser", registerUser);
router.post("/authenticate", authenticate);
router.get("/getAllUser", getAllUser);
router.get("/getByIdUser/:id", getByIdUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
module.exports = router;

async function registerUser(req, res) {
  var resp = new Object();
  try {
    let newUser = req.body;
    const cols = tablecols.getColumns(tables.Users);
    var chkUser = await fndb.getItemByColumn(
      tables.Users,
      "username",
      newUser.username
    );
    if (chkUser && chkUser.length > 0) {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: User Name already taken";
      return res.send(resp);
    }
    var result = await fndb.addNewItem(tables.Users, newUser);

    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Save data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in saving information";
      console.log("registerUser", "Error in register user");
    }
  } catch (err) {
    console.log("User Service - registerUser" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in saving information";
  }
  return res.send(resp);
}

async function authenticate(req, res) {
  var resp = new Object();
  try {
    let result = await fndb.getItemByColumn(
      tables.Users,
      "username",
      req.body.username
    );

    if (result.length > 0) {
      let usr = result[0];
      if (req.body.userpassword == usr["userpassword"]) {
        usr["userpassword"] = "";
      }
      const token = jwt.sign({ sub: usr.Id }, config.jwt_secret);
      usr.token = token;
      resp.result = usr;
      resp.success = true;
      resp.message = "user authenticated";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Invalid User Name or Password";
    }
  } catch (err) {
    console.log("User Service - authenticate" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: User Login";
  }
  return res.send(resp);
}

async function getAllUser(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getAllItems(tables.Users);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "All data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting information";
    }
  } catch (err) {
    console.log("User Service - getAllUser" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting information";
  }
  return res.send(resp);
}

async function getByIdUser(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getItemById(tables.Users, req.params.id);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "All data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting information";
    }
  } catch (err) {
    console.log("User Service - getByIdUser" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting information";
  }
  return res.send(resp);
}

async function updateUser(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.updateItem(tables.Users, req.params.id, req.body);

    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Updated data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in saving information";
      console.log("updateUser", "Error in save user");
    }
  } catch (err) {
    console.log("User Service - updateUser" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in update user - user service";
  }
  return res.send(resp);
}

async function deleteUser(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.deleteItem(tables.Users, req.params.id);

    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Save data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in delete information";
    }
  } catch (err) {
    console.log("User Service - deleteUser" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in delete information";
  }
  return res.send(resp);
}
