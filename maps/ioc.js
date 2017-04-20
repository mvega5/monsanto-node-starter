const somersault = require('somersault');
const ioc   = require('connect-ioc');

const rootContainer = somersault.createContainer();

//here we can register manually to rootContainer

const instance = ioc({
  rootContainer: rootContainer,
  autoRegister: {
      pattern: './lib/*/*[service,repository].js',
      rootDirectory: __dirname
    }
});

module.exports = instance;