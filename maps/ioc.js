const somersault = require('somersault');
const ioc   = require('connect-ioc');

const rootContainer = somersault.createContainer();

//here we can register manually to rootContainer
rootContainer.register('logger', require('./lib/logger'));
rootContainer.register('bookshelf', require('./lib/bookshelf'));

const instance = ioc({
  rootContainer: rootContainer,
  autoRegister: {
      pattern: './lib/*/*[service,repository].js',
      rootDirectory: __dirname
    }
});

module.exports = instance;