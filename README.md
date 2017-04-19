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
