'use strict';

const _ = require('lodash');
const ResourceNotFoundError = require('../errors/resource-not-found');

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
    
    delete req.body.id;
    
    service.create(req.body)
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

    let service = req.ioc.resolve(this.serviceName);

    let id = parseInt(req.params.id);
    let data = req.body; 
    delete data.id;
   
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
