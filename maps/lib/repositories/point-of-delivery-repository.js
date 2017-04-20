'use strict';

const PointOfDelivery = require('../models/point-of-delivery'); 

class PointOfDeliveryRepository{

  constructor(){
  }

  get(){
    return PointOfDelivery.forge().fetch();
  }
}

module.exports =  PointOfDeliveryRepository;
