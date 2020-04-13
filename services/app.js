const httpServer = require('../src/server');
const env = require('../core/env');
const moviesApi = require('../src/api');
const addMovie = require('../endpoints/addMovie');
const getMovies = require('../endpoints/getMovies');


(async () => {
    const server = httpServer({ port: env.httpPort });
    const movies = await moviesApi(env);

    [
        getMovies(movies),
        addMovie(movies),
    ].forEach(server.addEndpoint);

    server.start();
})();