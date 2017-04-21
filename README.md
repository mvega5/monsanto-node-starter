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

### Routes ###

On `index.js` on `express-microservice-starter` options we have

```javascript
const options = {
  ...
  controllersPath: 'lib/controllers',
  ...
};
```

that means that controllers are loaded from `lib/controllers`directory

this controllers are registered on express like resource routes following the pattern $BASE_URL/$FILE_NAME

### Controller ###

Lets take a look to `/lib/controllers/example.js`

```javascript
'use strict';

const log     = require('../logger');
const service = require('../services/example-service');

/**
 * Initialise Items endpoints
 *
 * @param router
 */
module.exports = (router) => {

  /**
   * Example Collection
   */
  router.get('/', (req, res, next) => {

    service.getExamples()
      .then((items) => {

        log.info('Correlation identifier generated', { correlationId: res.locals.correlationId });

        res.cacheControl({ maxAge: 10});
        res.json(items);
      })
      .catch(next);
  });

  /**
   * Example Error handling
   */
  router.get('/error', (req, res, next) => {
    service.throwError().catch(next);
  });
};

```
* The module receives a router and configures (Verb, Relative Path)=> Handler/s

* We can do route.get, router.post, router.put, router.patch, router.delete


### Layers ###

It's a common pattern to define layers on our code.
In this example we have 

* `lib/controllers`
* `lib/services`

And in the next steps we are going to create

* `lib/repositories`
* `lib/domain`

### Layers dependencies ###

`const service = require('../services/example-service');`

gets an singleton of `example service`, this has 3 main drawbacks

* We need to know the exact file path
* It's harder to implement other life scope rather than singleton
* It's harder to fullfill complex dependency graphs

That is where the IoC (that Java and .NET developers loves) comes handy


### Setting up IoC ###

There are serveral IoC alternatives for Node.js, we are going to use [somersault](https://www.npmjs.com/package/somersault) and [connect-ioc](https://www.npmjs.com/package/connect-ioc)

So let install these libraries
	
```
#!bash
npm install --save connect-ioc
npm install --save somersault
```

A quick note. 

 --save argument it's important because we it tell to npm to register the dependency on package.json
 
 `package.json`
 
```json
 {
 	...
   "dependencies": {
    "connect-ioc": "^1.0.6",
     ...
    "somersault": "^1.3.0"
  }
  ...
}

```

Now we need to integrate `connect-ioc`  with `express` app to doit more modular, we are going to create `ioc.js` module

```javascript
const somersault = require('somersault');
const connectioc   = require('connect-ioc');

const rootContainer = somersault.createContainer();

//here we can register manually to rootContainer
rootContainer.register('logger', require('./lib/logger'));

const instance = ioc({
  rootContainer: rootContainer,
  autoRegister: { //here we scan for services and repositories
      pattern: './lib/*/*[service,repository].js',
      rootDirectory: __dirname
    }
});

module.exports = instance;
```

then we can import `ioc.js` from `app.js` and integrate it with express

```javascript
'use strict';

...
const ioc          = require('./ioc');
...

const app  = express();

app.use(ioc.middleware);
app.use(micro(options));
...

module.exports = app;

```

### Injecting services on controller ###

Now that we have an ioc container integrated with express we can rewrite our `ExampleController`

```javascript
'use strict';

/**
 * Initialise Items endpoints
 *
 * @param router
 */
module.exports = (router) => {


  /**
   * Example Collection
   */
  router.get('/', (req, res, next) => {

    let service = req.ioc.resolve('exampleService');
    let log = req.ioc.resolve('logger');

    service.getExamples()
      .then((items) => {

        log.info('Correlation identifier generated', { correlationId: res.locals.correlationId });

        res.cacheControl({ maxAge: 10});
        res.json(items);
      })
      .catch(next);
  });
  ...
};

```

we got rid of

```javascript
const log     = require('../logger');
const service = require('../services/example-service');
```

replacing it with

```javascript
let service = req.ioc.resolve('exampleService');
let log = req.ioc.resolve('logger');
```

### Injecting repositories on services ###

It is a common pattern to have a repository layer and inject the repositories into services.

We can inject services and repositories on the class constructor matching the argument name with the service name

like this

```javascript
'use strict';

...

class ExampleService{

  constructor(exampleRepository){
    this.exampleRepository = exampleRepository;
    ...
  }

  getExamples(){
   return new Promise( (resolve, reject) =>{

     this.exampleRepository.getExamples().then(function(items){
        resolve(items)
     }, function(err){
       reject(err);
     });

    });
  }

  ...
}

module.exports = ExampleService;

```

### Integrating a relational database ###

There are serverals ORMs and query builders to acomplish this.
We are going to use [bookshelf](http://bookshelfjs.org)

let's install it

```
#!bash
npm install knex --save
npm install bookshelf --save
```

and we need to install the database drivers that we are going to use: PostgreSQL, SQLite

```
#!bash
npm install pg --save
npm install sqlite3 --save
```

We can also install sqlite command line client

```
#!bash
brew install sqlite
```

then we are going to create `knexfile.js`

```javascript
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

```

And `lib/bookshelf.js`

```javascript
'use strict';

const knexfile = require('../knexfile');

let config;

switch(process.env.NODE_ENV){
    case 'production':
        config = knexfile.production;
        break;
    case 'staging':
        config = knexfile.staging;
        break;
    case 'development':
    default:
        config = knexfile.development;
        break;
}

var knex = require('knex')(config);

module.exports = require('bookshelf')(knex);
```
Where we configure bookshelf connection pool matching NODE_ENV enviroment variable 


### Defining a Model ###

Bookshelf works with active record pattern, so we need to define our models in order to hit the database

let's create `lib/models/point-of-delivery.js`

```javacript
'use strict';

const bookshelf = require('../bookshelf');

class PointOfDelivery extends bookshelf.Model {  
    get tableName() {
        return 'pods';
    }

    get hasTimestamps() {
        return true;
    }
}

module.exports = PointOfDelivery;

```

Now we can create `lib/repositories/point-of-delivery-repository.js` like this:

```javascript
'use strict';

const PointOfDelivery = require('../models/point-of-delivery'); 

class PointOfDeliveryRepository{

  constructor(){
  }

  create(data){
    var model = new PointOfDelivery(data);
    return model.save();
  }

  get(){
    return PointOfDelivery.fetchAll();
  }

  getById(id){
    return PointOfDelivery.where({id: id}).fetch();
  }
}

module.exports =  PointOfDeliveryRepository;

```

both operation returns a promise

### Migrations ###

We have our `PointOfDelivery` model but, we don't have `pods table`

Let's talk about migrations

* Client: we are going to run migrations with [knex client](http://knexjs.org/#Migrations)
	
```
#!bash
npm install knex -g
```
* Creating the migration file

```
#!bash
 knex migrate:make "create pod table"
```

then you will have a new file on `/migrations` directory

we need to perform a `create table` on `up`
and a `drop table` on `down`

like this:

```javascript
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pods', function (table) {
        table.increments();
        table.string('name');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pods')
};
```

* Running migrations

	Once you have finished writing the migrations, you can update 	the database matching your NODE_ENV by running:

```
#!bash
 knex migrate:latest
```


### Documentation ###

To generate the [Swagger specification](http://swagger.io/specification), we will be using [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).

* Install swagger-jsdoc:

```
#!bash
npm install --save swagger-jsdoc
```



	 
	



