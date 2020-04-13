const express = require('express');
const { error } = require('../core/error');
const validator = require('../core/validator');
const bodyParser = require('body-parser');


module.exports = ({ port }) => {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    const accessable = {
        addEndpoint: ({ method, path, schema, handler, parser = null }) => {
            app[method](path, (req, res, next) => {
                let payload = {
                    query: req.query,
                    body: req.body,
                    params: req.params,
                }
                if (parser !== null) payload = parser(payload);

                const { isValid, errors } = validator(payload, schema);
                if (!isValid) return res.status(400).send({ isValid, errors });
                const { result, status } = handler(payload);
                res.status(status || 200).send(result);
            });
        },
        start: () => {
            app.use((err, req, res, next) => {
                if (err.code === undefined || err.code === 500) res.status(500).send('Something broke!');
                else res.status(err.code).send(err.message);
            });
            app.listen(port);
        }
    };
    return Object.freeze(accessable);
}