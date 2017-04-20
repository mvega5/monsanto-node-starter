'use strict';

const ResourceNotFoundError = require('../errors/resource-not-found');

class PointOfDeliveryService{

  constructor(pointOfDeliveryRepository){
    this.repository = pointOfDeliveryRepository;
  }

  get(){
    return this.repository.get();
  }

  getById(id){
    return this.repository.getById(id);
  }
}

module.exports = PointOfDeliveryService;
