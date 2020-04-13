const serverApi = require('../src/server');
const env = require('../core/env');
const moviesApi = require('../src/api');
const addMovie = require('../src/endpoints/addMovie');
const getMovies = require('../src/endpoints/getMovies');


(async () => {
  const server = serverApi({ port: env.httpPort });
  const movies = await moviesApi(env);

  [
    getMovies(movies),
    addMovie(movies),
  ].forEach(server.addEndpoint);

  server.start();
})();
