// Importing necessary modules and utilities
const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

// Define routes and associated controller methods

// Route for a specific review by ID
router
  .route("/:reviewId")
  .get(controller.read) // Handle GET request with the read controller method
  .put(controller.put) // Handle PUT request with the put controller method
  .delete(controller.delete) // Handle DELETE request with the delete controller method
  .all(methodNotAllowed); // Handle other HTTP methods with the methodNotAllowed utility

// Route for handling unsupported methods
router.route("/").all(methodNotAllowed);

// Export the router to be used in the main application
module.exports = router;