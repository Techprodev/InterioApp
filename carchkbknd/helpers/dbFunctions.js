const tables = require("./tableNames.js");
const tablecols = require("./tableColumns.js");
const mysql = require("./mySQLConnector.js");

module.exports = {
  getItemById,
  getItemByColumn,
  getAllItems,
  addNewItem,
  updateItem,
  deleteItem,
  customQuery,
};

async function sqlTransaction(queryText, dataVlues) {
  const connection = await mysql.connection();
  try {
    await connection.query("START TRANSACTION");
    var result = await connection.query(queryText, dataVlues);
    await connection.query("COMMIT");
    return result;
  } catch (err) {
    await connection.query("ROLLBACK");
    throw err;
  } finally {
    await connection.release();
  }
}
async function getItemById(tableName, col, colVal) {
  try {
    const keyCol = tablecols.getKeyColumn(tableName);
    const queryText =
      "SELECT * FROM " + tableName + " WHERE " + keyCol + " = '" + colVal + "'";
    const result = await sqlTransaction(queryText, "");
    return Object.values(JSON.parse(JSON.stringify(result)));
  } catch (err) {
    console.log("dbFunctions - customQuery" + err);
    return null;
  }
}

async function getItemByColumn(tableName, col, colVal) {
  try {
    const queryText =
      "SELECT * FROM " + tableName + " WHERE " + col + " = '" + colVal + "'";
    const result = await sqlTransaction(queryText, "");
    return Object.values(JSON.parse(JSON.stringify(result)));
  } catch (err) {
    console.log("dbFunctions - customQuery" + err);
    return null;
  }
}

async function getAllItems(tableName) {
  try {
    const queryText = "SELECT * FROM " + tableName;
    return await sqlTransaction(queryText, "");
  } catch (err) {
    console.log("dbFunctions - getAllItems" + err);
    return null;
  }
}

async function addNewItem(tableName, data) {
  try {
    const cols = tablecols.getColumns(tableName);
    var dataVal = {};
    var colKeys = Object.keys(cols);
    var colVals = Object.values(cols);
    for (i = 0; i < colKeys.length; i++) {
      var k = colKeys[i];
      dataVal[colVals[i]] = data[k];
    }

    const queryText = "INSERT INTO " + tableName + " SET ?";
    return await sqlTransaction(queryText, dataVal);
  } catch (err) {
    console.log("dbFunctions - addNewItem" + err);
    return null;
  }
}

async function updateItem(tableName, dataId, data) {
  try {
    const cols = tablecols.getColumns(tableName);
    const keyCol = tablecols.getKeyColumn(tableName);
    var dataVal = {};
    var colKeys = Object.keys(cols);
    var colVals = Object.values(cols);
    for (i = 0; i < colKeys.length; i++) {
      var k = colKeys[i];
      if (data[k]) {
        dataVal[colVals[i]] = data[k];
      }
    }
    const columns = Object.keys(dataVal);
    const values = Object.values(dataVal);

    let queryText =
      "UPDATE " +
      tableName +
      " SET " +
      columns.join(" = ? ,") +
      " = ?  WHERE " +
      keyCol +
      " = " +
      dataId;
    const result = await sqlTransaction(queryText, values);
    if (result.affectedRows == 0) {
      throw new Error("Data with this id was not found");
    }
    return result.message;
  } catch (err) {
    console.log("dbFunctions - updateItem" + err);
    return null;
  }
}
async function deleteItem(tableName, dataId) {
  try {
    const keyCol = tablecols.getKeyColumn(tableName);
    const queryText =
      "DELETE FROM " + tableName + " WHERE " + keyCol + " = " + dataId;
    const result = await sqlTransaction(queryText, "");
    return result;
  } catch (err) {
    console.log("dbFunctions - deleteItem" + err);
    return null;
  }
}
async function customQuery(queryText) {
  try {
    const result = await sqlTransaction(queryText, "");
    return Object.values(JSON.parse(JSON.stringify(result)));
  } catch (err) {
    console.log("dbFunctions - customQuery" + err);
    return null;
  }
}
