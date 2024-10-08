const mongoose = require("mongoose");
const config = require("config");
const dburl = config.get("databaseURL");
const dbname = config.get("databaseName");
const database = dburl.concat(dbname);
const logger = require("./logger");

async function main() {
  await mongoose.connect(database);
}
module.exports = function () {
  main().then(() => logger.info("Connection Established..."));
  // .catch((err) => logger.log(err));
};
