// Importing the necessary database connection
const db = require("../db/connection");

// Function to list all reviews
function list() {
  return db("reviews");
}

// Function to read details of a specific review by ID
function read(reviewId) {
  return db("reviews").where({ review_id: reviewId });
}

// Function to update a review with a given ID
function update(updatedReview, reviewId) {
  return db("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update({ ...updatedReview, updated_at: db.fn.now() })
    .then((updatedRecords) => updatedRecords[0]);
}

// Function to get details of a critic by ID
function getCritic(criticId) {
  return db("critics").where({ critic_id: criticId }).select();
}

// Function to delete a review with a given ID
function destroy(reviewId) {
  return db("reviews").where({ review_id: reviewId }).del();
}

// Exporting the functions to be used in the controller or other modules
module.exports = {
  list,
  read,
  update,
  getCritic,
  destroy,
};