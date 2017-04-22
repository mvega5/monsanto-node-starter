'use strict';

const _ = require('lodash');
const mocha    = require('mocha');
const assert   = require('assert')
const should   = require('chai').should();
const sinon    = require('sinon');
const promised = require('sinon-as-promised');
const request  = require('supertest-as-promised');

const app     = require('../../app');
const config  = require('konfig')({ path: 'config' });
const common = require('../common');


class PointOfDeliveryServiceContract{
  
  get(){}

  getById(id){}

  updateById(id, data){}

  deleteById(id){}
}


describe('controllers/points-of-delivery', function() {

  let sandbox;
  let iocMock;
  let loggerMock;
  let serviceMock;

  let basePath = config.app.microservice.server.name;

  let pods = [{
    id: 1,
    name: "Molinos"
  }, {
    id: 2,
    name: "Bunge"
  }];

  beforeEach(function(done) {
    sandbox = sinon.sandbox.create();
    iocMock = common.iocMock(sandbox);
    loggerMock = common.loggerMock(sandbox);

    serviceMock = sandbox.mock(new PointOfDeliveryServiceContract());
    iocMock.expects('resolve').withArgs('pointOfDeliveryService').returns(serviceMock.object);

    done();
  });

  afterEach(function(done) {
    sandbox.restore();
    done();
  });

  it('should return a list of PODs when GET /points-of-delivery is requested', function(done) {

    serviceMock.expects('get').once().resolves(pods);

    request(app)
        .get('/' + basePath + '/points-of-delivery')
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body[0].id.should.equal(1);
          res.body[0].name.should.equal('Molinos');
          res.body[1].id.should.equal(2);
          res.body[1].name.should.equal('Bunge');

          serviceMock.verify();
        })
        .expect(200, done);
  });

  it('should return a single POD when GET /points-of-delivery/{id} is requested', function(done) {

    let i = 1;
    let id = pods[i].id;
    let pod = pods[i];

    serviceMock.expects('getById').withArgs(id).once().resolves(pod);

    request(app)
        .get('/' + basePath + '/points-of-delivery/'+ id)
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.id.should.equal(pod.id);
          res.body.name.should.equal(pod.name);

          serviceMock.verify();
        })
        .expect(200, done);
  });

  it('should return Resource Not Found when GET /points-of-delivery/{id} targets an unknown id', function(done) {

    let id = 9999;
    serviceMock.expects('getById').withArgs(id).once().resolves(null);

    request(app)
        .get('/' + basePath + '/points-of-delivery/'+ id)
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.name.should.equal("ResourceNotFoundError");
          res.body.message.should.equal("Not Found");

          serviceMock.verify();
        })
        .expect(404, done);
  });

  it('should return a single POD when PUT /points-of-delivery/{id} is requested', function(done) {

    let i = 1;
    let id = pods[i].id;
    let source = pods[i];

    let update = { name: 'updated' };

    let updated = _.merge({},source,update);

    serviceMock.expects('updateById')
               .withArgs(id, update)
               .once()
               .resolves(updated);

    request(app)
        .put('/' + basePath + '/points-of-delivery/'+ id)
        .type('json')
        .send(update)
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.id.should.equal(source.id);
          res.body.name.should.equal(update.name);

          serviceMock.verify();
        })
        .expect(200, done);
  });

  it('should return Resource Not Found when PUT /points-of-delivery/{id} targets an unknown id', function(done) {

    let id = 9999;
    let update = { name: 'updated' };

    serviceMock.expects('updateById')
               .withArgs(id, update)
               .once()
               .resolves(null);

    request(app)
        .put('/' + basePath + '/points-of-delivery/'+ id)
        .type('json')
        .send(update)
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.name.should.equal("ResourceNotFoundError");
          res.body.message.should.equal("Not Found");

          serviceMock.verify();
        })
        .expect(404, done);
  });

  it('should return Empty when DELETE /points-of-delivery/{id} is requested', function(done) {

    let i = 1;
    let id = pods[i].id;
    let source = pods[i];

    serviceMock.expects('deleteById')
               .withArgs(id)
               .once()
               .resolves(source);

    request(app)
        .delete('/' + basePath + '/points-of-delivery/'+ id)
        .set('Accept', 'application/json')
        .expect(function(res) {
          assert.ok(_.isEmpty(res.body), "body is empty")

          serviceMock.verify();
        })
        .expect(200, done);
  });

  it('should return Resource Not Found when DELETE /points-of-delivery/{id} targets an unknown id', function(done) {

    let id = 9999;

    serviceMock.expects('deleteById')
               .withArgs(id)
               .once()
               .resolves(null);

    request(app)
        .delete('/' + basePath + '/points-of-delivery/'+ id)
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.name.should.equal("ResourceNotFoundError");
          res.body.message.should.equal("Not Found");

          serviceMock.verify();
        })
        .expect(404, done);
  });

});
