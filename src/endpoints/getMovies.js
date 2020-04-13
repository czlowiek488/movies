module.exports = movies => ({
    method: 'get', path: '/',
    schema: [
        { field: 'genres', type: 'array', arrayOf: 'string', state: 'optional' },
        { field: 'duration', type: 'number', state: 'optional' },
    ],
    handler: ({ query: { genres, duration } }) =>
        ({ result: movies.get({ genres, duration }) })
});