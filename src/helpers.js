const { random } = require('../core/random');


exports.getMoviesBetween = (movies, start, end) =>
    movies.filter(movie => movie.runtime > start && movie.runtime < end);

exports.getRandomElement = (arr) =>
    arr[random(0, arr.length - 1)];

exports.getMoviesWithGenres = movies => genres =>
    movies.filter(movie => genres.every(genre => movie.genres.includes(genre)));


exports.getAllCombinations = (array) => {
    const combinations = [];
    let bits = [];
    const slent = Math.pow(2, array.length);

    for (let i = 0; i < slent; i++) {
        bits = [];
        for (let j = 0; j < array.length; j++) {
            if ((i & Math.pow(2, j))) bits.push(array[j]);
        }
        if (bits.length > 0) combinations.push(bits);
    }
    return combinations.reverse();
}

exports.uniqueObject = field => (acc, object) => {
    const isDuplicated = acc.find(one => object[field] === one[field]);
    if (!isDuplicated) acc.push(object);
    return acc;
}