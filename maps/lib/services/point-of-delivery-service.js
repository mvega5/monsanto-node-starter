'use strict';

const ResourceNotFoundError = require('../errors/resource-not-found');

class PointOfDeliveryService{

  constructor(pointOfDeliveryRepository){
    this.repository = pointOfDeliveryRepository;
  }
  
  create(data){
    return this.repository.create(data);
  }

  get(){
    return this.repository.get();
  }

  getById(id){
    return this.repository.getById(id);
  }

  updateById(id, data){ 
    return this.repository
    .getById(id)
    .then(function(model){
        return (model)? model.save(data) : null;
    });
  }

  deleteById(id){
    return this.repository
    .getById(id)
    .then(function(model){
        return (model)? model.destroy() : null;
    });
  }
}

module.exports = PointOfDeliveryService;
