const express = require('express');
const env = require('./core/env');
const api = require('./src/api');
const bodyParser = require('body-parser');


(async () => {

    const moviesApi = await api(env);

    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.get('/', ({ query: { genres, duration } }, res) => {
        //validaiton
        const movies = moviesApi.get({ genres: genres.split(','), duration });
        res.send(movies);
    });

    app.post('/', (req, res) => {
        //validation
        moviesApi.add([req.body]);
        res.send();
    });

    app.listen(env.httpPort)

})();