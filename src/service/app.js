const serverApi = require('../../core/server');
const env = require('../../core/env');
const moviesApi = require('../db/movies');
const addMovie = require('../endpoint/addMovie');
const getMovies = require('../endpoint/getMovies');


(async () => {
  const server = serverApi({ port: env.httpPort });
  const movies = await moviesApi(env);

  [
    getMovies(movies),
    addMovie(movies),
  ].forEach(server.addEndpoint);

  server.start();
})();
