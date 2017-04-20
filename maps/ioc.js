const somersault = require('somersault');
const ioc   = require('connect-ioc');

const myContainer = somersault.createContainer();

exports.container = myContainer;

exports.middleware = ioc({
  rootContainer: myContainer,
  autoRegister: {
      pattern: './lib/services/*-service.js',
      rootDirectory: __dirname
    }
}).middleware;
