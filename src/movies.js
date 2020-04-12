const logger = require('../core/logger');
const { get, upsert } = require('../core/file-promise');
const { databaseFilePath, fileEncoding, fileUpdateDelay } = require('../core/env');
const { resolve } = require('path');
const { sleep } = require('../core/sleep');
const { tick } = require('../core/tick');

const absDatabaseFilePath = resolve(databaseFilePath);

const updateFile = async (state) => {
    await sleep(fileUpdateDelay);
    await upsert(absDatabaseFilePath, JSON.stringify(state), fileEncoding);
    logger.alert('Files Updated');
    tick(() => updateFile(state), e => logger.error('File updating failed!', e));
};

module.exports = async () => {
    const state = JSON.parse(await get(absDatabaseFilePath, fileEncoding));
    tick(() => updateFile(state), e => logger.error('File updating failed!', e));

    const accessable = {
        add: (movies) => {
            const isCorrectGenre = !movies.some(({ genres }) => genres.some(genre => !state.genres.includes(genre)));
            if (!isCorrectGenre) throw Error('Genre is not allowed!')
            state.movies.concat(movies.map((movie, index) => {
                movie.id = state.movies.length + index;
                movie.genres = movie.genres.sort();
            }));
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
    }
    return Object.freeze(accessable);
};

(async () => {

    const xd = await module.exports();

    // xd.add([{ genres: ['x'] }]);
    const res = xd.get({ genres: ['Fantasy', 'Comedy', 'Drama'], runtime: 90 });
    logger.log({ res: res.slice(1, 19).map(x => [x.genres, x.runtime]) });
})();