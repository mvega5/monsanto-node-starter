const somersault = require('somersault');
const ioc   = require('connect-ioc');

const myContainer = somersault.createContainer();

const instance = ioc({
  rootContainer: myContainer,
  autoRegister: {
      pattern: './lib/*/*[service,repository].js',
      rootDirectory: __dirname
    }
});

exports.container = instance.rootContainer;

exports.middleware = instance.middleware;
