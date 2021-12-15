// Importing moment to use for date formatting
const moment = require("moment");

// Middle-ware function takes in request, response and then next, next is called last in order to move to the next middleware function that's in the stack
const logger = (req, res, next) => {
  // gets me the hit url
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
