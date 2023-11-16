const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const service = require("./theaters.service");

// Executive function to list theaters with associated movies
async function list(req, res) {
  const theaters = await service.list();
  const theatersAndMovies = [];

  // Iterate through theaters and fetch associated movies for each theater
  for (let i = 0; i < theaters.length; i++) {
    const theater = theaters[i];
    const { theater_id } = theater;
    const movies = await service.getMovies(theater_id);

    // Combine theater details with associated movies
    const TM = { ...theater, movies: movies };
    theatersAndMovies.push(TM);
  }

  // Respond with a JSON object containing the list of theaters and associated movies
  res.status(200).json({ data: theatersAndMovies });
}

// Exporting the executive function with error handling middleware
module.exports = {
  list: [asyncErrorBoundary(list)],
};