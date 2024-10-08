const logger = require("../startup/logger");

module.exports = function (err, req, res, next) {
  logger.error(err, err.message);
  res.status(404).send("Something failed");
};
