module.exports = movies => ({
  method: 'post',
  path: '/',
  schema: [
    { where: 'body', field: 'genres', type: 'array', arrayOf: 'string', state: 'required' },
    { where: 'body', field: 'title', type: 'string', maxLength: 255, state: 'required' },
    { where: 'body', field: 'year', type: 'number', state: 'required' },
    { where: 'body', field: 'runtime', type: 'number', state: 'required' },
    { where: 'body', field: 'director', type: 'string', maxLength: 255, state: 'required' },
    { where: 'body', field: 'actors', type: 'string', state: 'optional' },
    { where: 'body', field: 'plot', type: 'string', state: 'optional' },
    { where: 'body', field: 'postedUrl', type: 'string', state: 'optional' },
  ],
  handler: ({ body }) =>
    ({ result: movies.add([body]) }),
});
