require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      timezone: "local",
      dateStrings: true,
      typeCast: true,
    },
    logging: console.log,
    timezone: "Europe/Brussels",
    //timezone: '+05:30' //for writing to database
  }
);
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
db.sync({
  logging: console.log,
  force: false, //The "force: true" option for sync will add "DROP TABLE IF EXISTS" to the create statements,
})
  .then(() => {
    console.log("Database sync sucessfull");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

module.exports = db;
