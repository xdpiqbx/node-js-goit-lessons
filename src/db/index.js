const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}); // Пока в db лежит промис

mongoose.connection.on("connecned", () => {
  console.log("Mongoose connection to db");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: [${err.message}]`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for DB disconnected and app terminated");
  process.exit(1);
});

module.exports = db;
