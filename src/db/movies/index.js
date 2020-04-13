const { resolve } = require('path');
const logger = require('../../../core/logger');
const { get, upsert } = require('../../../core/file-promise');
const { sleep } = require('../../../core/sleep');
const { tick } = require('../../../core/tick');
const { error } = require('../../../core/error');
const {
  getMoviesBetween,
  getRandomElement,
  getMoviesWithGenres,
  getAllCombinations,
  uniqueObject,
  parseIncomingMovie,
  isGenreNotCorrect,
  isDuplicatedMovie,
} = require('./helpers');

module.exports = async ({ databaseFilePath, fileEncoding, fileUpdateDelay }) => {
  if ([databaseFilePath, fileEncoding, fileUpdateDelay].some(field => field === null || field === undefined)) {
    throw error({ message: 'Api config is missing required fields' });
  }
  const absDatabaseFilePath = resolve(databaseFilePath);

  const updateFile = async (state) => {
    await sleep(fileUpdateDelay);
    await upsert(absDatabaseFilePath, JSON.stringify(state), fileEncoding);
    logger.alert('Files updated successfully');
    tick(() => updateFile(state), e => logger.error('File updating failed!', e));
  };

  const state = JSON.parse(await get(absDatabaseFilePath, fileEncoding));
  tick(() => updateFile(state), e => logger.error('File updating failed!', e));

  const accessable = {
    add: (movies) => {
      if (isGenreNotCorrect({ genres: state.genres, movies })) {
        throw error({ message: 'Genre is not correct!', code: 400 });
      }
      if (isDuplicatedMovie({ newMovies: movies, movies: state.movies })) {
        throw error({ message: 'Movie already exists', code: 409 });
      }
      state.movies = state.movies.concat(movies.map(parseIncomingMovie(state.movies.length)));
    },
    get: ({ genres = null, duration = null }) => {
      if (genres === null && duration === null) return getRandomElement(state.movies);
      if (genres === null) return getRandomElement(getMoviesBetween(state.movies, duration - 10, duration + 10));
      const moviesWithGenres = getAllCombinations(genres)
        .map(getMoviesWithGenres(state.movies))
        .flat(1)
        .reduce(uniqueObject('id'), []);
      if (duration === null) return moviesWithGenres;
      return getMoviesBetween(moviesWithGenres, duration - 10, duration + 10);
    },
  };
  return Object.freeze(accessable);
};
