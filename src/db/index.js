const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(
  path.join(__dirname, "..", "..", "data", "db.json")
);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ cats: [] }).write();

module.exports = db;
