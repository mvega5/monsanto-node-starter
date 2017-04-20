'use strict';

const ResourceNotFoundError = require('../errors/resource-not-found');

class PointOfDeliveryService{

  constructor(pointOfDeliveryRepository){
    this.repository = pointOfDeliveryRepository;
  }

  get(){
   return new Promise( (resolve, reject) =>{

     this.repository.get().then(function(items){
        resolve(items)
     }, function(err){
       reject(err);
     });

    });
  }
}

module.exports = PointOfDeliveryService;
