const db = require("../db/connection");

// Function to list all theaters
function list() {
  return db("theaters");
}

// Function to get movies associated with a specific theater
function getMovies(theaterId) {
  return db("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*", "mt.is_showing")
    .where({ "t.theater_id": theaterId });
}

// Exporting the functions to be used in the controller or other modules
module.exports = {
  list,
  getMovies,
};