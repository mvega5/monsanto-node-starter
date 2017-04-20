# Monsanto Maps #

### How do I get set up? ###

* Install Node.js

	Download it from [here](https://nodejs.org/es/download/)
	and install it

	After that you will have access to the Node Package Manager AKA npm

* Install Yeoman

	[Yeoman](http://yeoman.io) is a generic scaffolding system that will help us to go faster

	```
	#!bash
	npm install -g yo
	```

* Install Microservice Generator

	There are several Yeoman generators, we will give it a try to [express-microservice-generator](https://github.com/robinsio/express-microservice-generator)

	```
	#!bash
	npm install -g generator-microservice
	```
* At this point we can generate or microservice structure

	```
	#!bash
	yo microservice
	#Your project name? maps
	#Your microservice name? geoservices/stakeholders/industry/v1
	#Enable entitlements? y
	```

* Download node dependencies

	```
	#!bash
	cd maps
	npm install
	```
	
* Run the microservice

	```
	#!bash
	npm start
	```
	and go to
	
	[http://localhost:8001/geoservices/stakeholders/industry/v1/info]()
	[http://localhost:8001/geoservices/stakeholders/industry/v1/health]()
	[http://localhost:8001/geoservices/stakeholders/industry/v1/example]()

### npm as task runner? ###

* npm also works like a task runner. So when we do `npm start` we are executing what is defined on `package.json` `scripts.start` property 

```json
{
  "name": "maps",
  "version": "0.0.1",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "./node_modules/mocha/bin/mocha test"
  },
  "dependencies": { ... },
  "devDependencies": {  ...  }
}

```

in this case `node app.js`, that JavaScript file it's the entry point of our node.js micro-service

* We also have a test task, so if we run `npm test` our unit tests will be executed

* start and test are standard [npm tasks](https://docs.npmjs.com/misc/scripts)

* We could define a custom tasks called "deploy"

```json
{
  ...
  "scripts": {
    "start": "node app.js",
    "test": "./node_modules/mocha/bin/mocha test",
    "deploy": "./deploy.sh"
  }
  ...
}

```
and in order to execute it we should do `npm run deploy`

### Lets take a look to app.js ###

```javascript
'use strict';

const config       = require('konfig')({ path: 'config' });
const express      = require('express');
const micro        = require('express-microservice-starter');

const log = require('./lib/logger');

const PORT = process.env.PORT || config.app.server.port;
const SERVICE = config.app.microservice.server.name;

const options = {
  discoverable: true,
  controllersPath: 'lib/controllers',
  monitorsPath: 'lib/monitors',
  correlationHeaderName: 'X-Unity-CorrelationID'
};

const app  = express();

app.use(micro(options));
app.use(require('./lib/express/resource-not-found-middleware'));
app.use(require('./lib/express/error-handler-middleware'));

app.listen(PORT, () => log.info('Initialised [' + SERVICE + '], Port: [' + PORT + ']'));

module.exports = app;
```

* `const config       = require('konfig')({ path: 'config' });`  

	imports `konfig` library from `node_modules` directory and after that loads the configuration from `config/app.yml`
	
* `const express      = require('express'); `

	imports [express](http://expressjs.com) a minimalist web framework for Node.js
	
* `const micro        = require('express-microservice-starter')`

	imports [express-microservice-starter](https://www.npmjs.com/package/express-microservice-starter)
	that provides	of the box:

	* CORS support
	* Cache-Control header support
	* Body-parsing support
	* Configurable controller/route auto-scanning
	* Configurable health monitors
	* Configurable per-application logging
	* Automatic service registration with ZooKeeper
	* Actuator info and health endpoints (/info and /health)
	* Partial Response Powered by express-partial-response
	* Request correlation id support (res.locals.correlationId and req.log Bunyan child logging also provided)

* `const log = require('./lib/logger');`
	
	imports the file `./lib/logger.js`, note that `require` takes a relative path, that is because it's not importing a package from `node_modules` directory

* `const options = {...}`
	
	configures express routes

* `const app  = express();`

	creates a new express application object

* `app.use(micro(options));`

	This line register the `micro` middleware to express app.
	
	Express has a pipes & filters architecture, so `app.use(...)`
	actually takes a filter like this 
	
	```javascript
	function(err, req, res, next){
		...
	}
	```
* `app.use(require('./lib/express/resource-not-found-middleware'));`
	
	Filters are executed on the registration order, like a chain of responsabilty, so if there is no controller matching the request, it will fallback on the resource not found middleware
		
* `app.use(require('./lib/express/error-handler-middleware'));`

	This is a general error handler

* `app.listen(PORT, () => log.info('Initialised [' + SERVICE + '], Port: [' + PORT + ']'));`

	binds app object to PORT and start listening for connections

	
	 
	



