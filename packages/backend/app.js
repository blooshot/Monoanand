const express = require("express");
const logger = require("./startup/logger");
require("./startup/db")();
// require("./startup/config")();
const app = express();
require("./startup/cors")(app);
require("./startup/routes")(app);

const port = process.env.PORT || 3000;

process.on("uncaughtException", (err, origin) => {
  let finalMsg = `${origin}: ${err}`;
  console.log(finalMsg);
  logger.debug(finalMsg);
  // process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  let finalMsg = `'Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`;
  console.log(finalMsg);
  logger.debug(finalMsg);
  // process.exit(1);
});

app.listen(port, () => {
  logger.debug(`Example app listening on port ${port}`);
});
