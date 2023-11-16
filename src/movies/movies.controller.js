// Importing the movies service and asyncErrorBoundary utility
const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Middleware for checking parameters
const _paramsCheck = async (req, res, next) => {
  const { movieId } = req.params;
  const match = await service.read(Number(movieId));

  // Check if no movie is found or movieId is not provided
  if (match.length === 0 || !movieId)
    return next({
      status: 404,
      message: `movieId: ${movieId} does not exist in the database`,
    });

  // If a match is found, set the movie in res.locals.movie and move to the next middleware or route handler
  res.locals.movie = match[0];
  next();
};

// Executive functions

// List all movies or currently showing movies
async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing
    ? await (await service.listShowing()).splice(0, 15)
    : await service.list();

  // Respond with a JSON object containing the retrieved data
  res.status(200).json({ data: data });
}

// Read details of a specific movie
async function read(req, res) {
  // Respond with a JSON object containing the movie details from res.locals.movie
  res.status(200).json({ data: res.locals.movie });
}

// List reviews for a specific movie with critic details
async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];

  // Iterate through reviews and add critic details to each review
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }

  // Respond with a JSON object containing the array of reviews with critic details
  res.status(200).json({ data: allReviews });
}

// List theaters where a specific movie is being shown
async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);

  // Respond with a JSON object containing the list of theaters
  res.status(200).json({ data: result });
}

// Module exports
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(_paramsCheck), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listTheaters),
  ],
};