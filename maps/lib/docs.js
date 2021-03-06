'use strict';

const _            = require('lodash');
const path         = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const config       = require('konfig')({ path: 'config' });

const PORT = process.env.PORT || config.app.server.port;
const SERVICE = config.app.microservice.server.name;

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:' + PORT,
  basePath: '/'
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [
    path.join(__dirname, 'controllers/*.js'),
    path.join(__dirname, 'models/*.js')
  ],
};

let docs = swaggerJSDoc(options);

//fix paths
var fixedPaths = _.mapKeys(docs.paths, (routes, path)=>{
  return '/' + SERVICE +  path;
});
docs.paths = fixedPaths;

// initialize swagger-jsdoc
module.exports = docs;