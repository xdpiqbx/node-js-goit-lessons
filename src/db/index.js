const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = new MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5,
  useNewUrlParser: true,
}); // Пока в db лежит промис

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection for DB disconnected and app terminated");
  process.exit(1);
});

module.exports = db;
