const {
    getMoviesBetween,
    getMoviesWithGenres,
    getAllCombinations,
    parseIncomingMovie,
    isGenreNotCorrect,
    isDuplicatedMovie,
} = require('../src/api/helpers');

test('Getting movies with runtime between', () => {
    const movies = [
        { runtime: 100 },
        { runtime: 10 },
        { runtime: 1000 },
        { runtime: 110 },
        { runtime: 90 },
    ];

    const result = getMoviesBetween(movies, 85, 115);

    expect(result[0].runtime).toBe(100);
    expect(result[1].runtime).toBe(110);
    expect(result[2].runtime).toBe(90);
});

test('Getting movies with specific genres', () => {
    const movies = [
        { genres: ['Fantasy', 'Drama', 'Crime'] },
        { genres: ['Fantasy'] },
        { genres: ['Drama'] },
        { genres: ['Comedy', 'Fantasy'] },
        { genres: ['Comedy', 'Crime'] },
    ];

    const result = getMoviesWithGenres(movies)(['Fantasy', 'Crime']);

    expect(result[0].genres).toEqual(['Fantasy', 'Drama', 'Crime']);
});

test('Get all combinations of elements in array', () => {
    const arr = [1, 2, 3];

    const result = getAllCombinations(arr);

    expect(result[0]).toEqual([1, 2, 3]);
    expect(result[1]).toEqual([1, 2]);
    expect(result[2]).toEqual([1, 3]);
    expect(result[3]).toEqual([2, 3]);
    expect(result[4]).toEqual([1]);
    expect(result[5]).toEqual([2]);
    expect(result[6]).toEqual([3]);
});

test('Serialize new added movie', () => {
    const arr = [
        { id: 1, genres: ['Music', 'Comedy'] },
        { id: 2, genres: ['History', 'Comedy'] },
    ];

    const result = arr.map(parseIncomingMovie(arr.length));

    expect(result[0].id).toBe(3);
    expect(result[0].genres).toEqual(['Comedy', 'Music']);
    expect(result[1].id).toBe(4);
    expect(result[1].genres).toEqual(['Comedy', 'History']);
});

test('Matching genres not found in db', () => {
    const genres = ['Comedy'];
    const movies = [{ genres: ['History', 'Comedy'] }];

    const result = isGenreNotCorrect({ genres, movies });

    expect(result).toBe(true);
});

test('Matching genres found in db', () => {
    const genres = ['Comedy', 'History'];
    const movies = [{ genres: ['History', 'Comedy'] }];

    const result = isGenreNotCorrect({ genres, movies });

    expect(result).toBe(false);
});

test('Movie is duplicated', () => {
    const movies = [{ title: 'A' }, { title: 'B' }];
    const newMovies = [{ title: 'A' }]

    const result = isDuplicatedMovie({ movies, newMovies });

    expect(result).toBe(true);
});

test('Movie is not duplicated', () => {
    const movies = [{ title: 'A' }, { title: 'B' }];
    const newMovies = [{ title: 'C' }]

    const result = isDuplicatedMovie({ movies, newMovies });

    expect(result).toBe(false);
});