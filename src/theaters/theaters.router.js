const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

// Define routes and associated controller methods

// Route for listing theaters with associated movies
router.route("/").get(controller.list) // Handle GET request with the list controller method
  .all(methodNotAllowed); // Handle other HTTP methods with the methodNotAllowed utility

// Export the router to be used in the main application
module.exports = router;