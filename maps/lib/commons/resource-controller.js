'use strict';

const _ = require('lodash');
const ResourceNotFoundError = require('../errors/resource-not-found');
const BadRequestError = require('../errors/bad-request');

class ResourceController{
  constructor(serviceName){
    this.serviceName = serviceName;
  }

  get routes() {
      return ['get','create', 'getById', 'updateById', 'deleteById'];
  }

  bindAll(routes){
    let functions = (routes)? routes : this.routes;
    return _.bindAll(this, functions);
  }

  get(req, res, next){

    let service = req.ioc.resolve(this.serviceName);

    service.get()
      .then((items) => {

        res.json(items);

      })
      .catch(next);
  }

  create(req, res, next){

    let service = req.ioc.resolve(this.serviceName);
    
    let data = req.body;

    service.create(data)
      .then((item) => {
        res.json(item);
      })
      .catch(next);
  }

  getById(req, res, next){

    let service = req.ioc.resolve(this.serviceName);
    
    let id = parseInt(req.params.id);

    service.getById(id)
      .then((item) => {
        if(item) res.json(item);
        else next(new ResourceNotFoundError("Not Found"));
      })
      .catch(next);
  }

  updateById(req, res, next){

    if(req.body.id != undefined)
      req.checkBody('id', 'body.id should match params.id').equals(req.params.id);

    let errors = req.validationErrors();
    
    if (!_.isEmpty(errors))
      return next(new BadRequestError("Invalid", "Update", errors));
    
    let service = req.ioc.resolve(this.serviceName);

    let id = parseInt(req.params.id);
    let data = req.body;
    
    service.updateById(id, data)
    .then((item) => {
      if(item) res.json(item);
      else next(new ResourceNotFoundError("Not Found"));
    })
    .catch(next);
  }

  deleteById(req, res, next){

    let service = req.ioc.resolve(this.serviceName);

    let id = parseInt(req.params.id);

    service.deleteById(id)
    .then((r) => {
       if(r) res.status(200).send();
       else next(new ResourceNotFoundError("Not Found"));
    })
    .catch(next);
  }
}

module.exports = ResourceController;
