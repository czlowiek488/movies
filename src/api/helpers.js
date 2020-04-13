const { random } = require('../../core/random');


exports.getMoviesBetween = (movies, start, end) =>
    movies.filter(movie => movie.runtime > start && movie.runtime < end);

exports.getRandomElement = (arr) =>
    arr[random(0, arr.length - 1)];

exports.getMoviesWithGenres = movies => genres =>
    movies.filter(movie => genres.every(genre => movie.genres.includes(genre)));

/**
 * @name getAllCombinations
 * @description
 * alghoritm was copied from stackoverflow and changed a bit to adjust for current requirements
 * - in last line sort was applied
 * https://stackoverflow.com/a/59942031/9731304
 */
exports.getAllCombinations = (array) => {
    const combi = [];
    let temp = [];
    const slent = Math.pow(2, array.length);

    for (let i = 0; i < slent; i++) {
        temp = [];
        for (let j = 0; j < array.length; j++) {
            if ((i & Math.pow(2, j))) temp.push(array[j]);
        }
        if (temp.length > 0) combi.push(temp);
    }
    return combi.sort((a, b) => b.length - a.length);
}

exports.uniqueObject = field => (acc, object) => {
    const isDuplicated = acc.find(one => object[field] === one[field]);
    if (!isDuplicated) acc.push(object);
    return acc;
}

exports.parseIncomingMovie = movies_length => (movie, index) => {
    movie.id = movies_length + index + 1;
    movie.genres = movie.genres.sort();
    return movie;
};

exports.isGenreNotCorrect = ({ genres, movies }) =>
    movies.some(movie => movie.genres.some(genre => !genres.includes(genre)));

exports.isDuplicatedMovie = ({ newMovies, movies }) =>
    newMovies.some(({ title }) => movies.some(movie => movie.title === title));