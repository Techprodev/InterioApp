const tables = require("./tableNames.js");
module.exports = {
  getColumns,
  getKeyColumn,
};

function getColumns(tableName) {
  var UserCols = {
    username: "username",
    userpassword: "userpassword",
    mobile: "mobile",
    email: "email",
  };

  switch (tableName) {
    case tables.Users:
      return UserCols;
      break;
    default:
      return null;
  }
}

function getKeyColumn(tableName) {
  const UserKey = "userid";
  switch (tableName) {
    case tables.Users:
      return UserKey;
    default:
      return null;
  }
}
