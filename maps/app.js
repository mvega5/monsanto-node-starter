'use strict';

const config       = require('konfig')({ path: 'config' });
const express      = require('express');
const micro        = require('express-microservice-starter');
const ioc          = require('./ioc');
const log          = require('./lib/logger');
const docs         = require('./lib/docs');
const validator    = require('./lib/validator');

const PORT = process.env.PORT || config.app.server.port;
const SERVICE = config.app.microservice.server.name;

const options = {
  discoverable: true,
  controllersPath: 'lib/controllers',
  monitorsPath: 'lib/monitors',
  correlationHeaderName: 'X-Unity-CorrelationID'
};

const app  = express();

app.use('/' + SERVICE + '/api-docs', express.static('public'));
app.get('/' + SERVICE + '/swagger.json', function(req, res) { res.json(docs); });

app.use(validator());
app.use(ioc.middleware);
app.use(micro(options));
app.use(require('./lib/express/resource-not-found-middleware'));
app.use(require('./lib/express/error-handler-middleware'));

app.listen(PORT, () => log.info('Initialised [' + SERVICE + '], Port: [' + PORT + ']'));

module.exports = app;
