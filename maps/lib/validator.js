
const express      = require('express');
const bodyParser   = require('body-parser');
const validator    = require('swagger-express-validator');
const docs         = require('./docs');

module.exports = function (options) {
  var app = express();

  app.once('mount', function onmount(parent) {

    app.use(bodyParser.json());

    app.use(validator({ 
      schema: docs,
      validateRequest: true,
      validateResponse: false,
      requestValidationFn: (req, body, errors)=>{ req.swaggerValidationErrors = errors; }
    }));

    app.use((req,res, next)=>{ 
      if(req.swaggerValidationErrors) res.status(400).json(req.swaggerValidationErrors);
      else next();
    });

  });

  return app;
};