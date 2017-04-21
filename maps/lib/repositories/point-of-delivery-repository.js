'use strict';

const PointOfDelivery = require('../models/point-of-delivery'); 

class PointOfDeliveryRepository{

  constructor(){
  }

  create(data){
    let model = new PointOfDelivery(data);
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
