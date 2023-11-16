// Importing necessary modules and utilities
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

// Define routes and associated controller methods

// Route for listing theaters for a specific movie
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters) 
  .all(methodNotAllowed); 

// Route for listing reviews for a specific movie
router
  .route("/:movieId/reviews")
  .get(controller.listReviews) 
  .all(methodNotAllowed); 

// Route for reading details of a specific movie
router
  .route("/:movieId")
  .get(controller.read) 
  .all(methodNotAllowed); 

// Route for listing all movies
router
  .route("/")
  .get(controller.list) 
  .all(methodNotAllowed); 

// Export the router to be used in the application
module.exports = router;