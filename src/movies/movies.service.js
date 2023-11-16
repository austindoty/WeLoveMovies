// Function to list movies that are currently showing
function listShowing() {
  return db("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.is_showing": true });
}

// Function to read details of a specific movie by ID
function read(movieId) {
  return db("movies").where({ movie_id: movieId });
}

// Function to get details of a critic by ID
function getCritics(criticId) {
  return db("critics").where({ critic_id: criticId });
}

// Function to list reviews for a specific movie by ID
function listReviews(movieId) {
  return db("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .where({ "m.movie_id": movieId });
}

// Function to list theaters where a specific movie is being shown by ID
function listTheaters(movieId) {
  return db("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

// Exporting the functions to be used in the controller or other modules
module.exports = {
  listShowing,
  read,
  getCritics,
  listReviews,
  listTheaters,
};