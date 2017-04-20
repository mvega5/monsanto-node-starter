'use strict';

const RequestServiceDiscovery = require('request-service-discovery');

const config = require('konfig')({path: 'config'});

const ResourceNotFoundError = require('../errors/resource-not-found');

class ExampleService{

  constructor(exampleRepository){
    this.exampleRepository = exampleRepository;

    /*
     * Remove comment below to enable a zookeeper connected client.
     */

    // this.client = new RequestServiceDiscovery({
    //   connectionString: config.app.zookeeper.connectionString,
    //   basePath: 'services',
    //   serviceName: 'my/other/service/v1'
    // });
  }

  getExamples(){
   return new Promise( (resolve, reject) =>{

     this.exampleRepository.getExamples().then(function(items){
        resolve(items)
     }, function(err){
       reject(err);
     });

     /*
      * Remove comment below to use zookeeper connected client.
      */

      // this.client.get('example', null, (err, item) => {
      //   if(err) reject(err);
      //
      //   resolve(item);
      // });
    });
  }

  throwError(){
    return new Promise((resolve, reject) => {
      reject(new ResourceNotFoundError("Example Error thrown by Service"));
    })
  }
}

module.exports = ExampleService;
