const { Sequelize } = require("sequelize");
const { DB_CREDS } = require("../../credentials");
const customSqlLogger = function (msg) {};
console.log(DB_CREDS, "DB");
const sequelize = new Sequelize("sevaro", "root", "", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
  dialectOptions: { decimalNumbers: true },
  logging: customSqlLogger,
});
module.exports = sequelize;
