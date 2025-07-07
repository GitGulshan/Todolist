const { Client } = require("pg");

require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => console.log(" connecting to the database server"))
  .catch((error) =>
    console.error("the error is to connecting with the databse", error.message)
  );

module.exports = client;
