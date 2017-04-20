'use strict';

const mocha    = require('mocha');
const should   = require('chai').should();
const sinon    = require('sinon');
const promised = require('sinon-as-promised');
const request  = require('supertest-as-promised');

const app     = require('../../app');
const config  = require('konfig')({ path: 'config' });
const common = require('../common');


class ExampleServiceContract{

  getExamples(){}

  throwError(){}
}


describe('controllers/example', function() {

  let sandbox;
  let iocMock;
  let serviceMock;

  let basePath = config.app.microservice.server.name;

  let examples = [{
    "id": 1,
    "name": "movies"
  }, {
    "id": 2,
    "name": "shows"
  }];

  beforeEach(function(done) {
    sandbox = sinon.sandbox.create();
    iocMock = common.iocMock(sandbox);

    serviceMock = sandbox.mock(new ExampleServiceContract());
    iocMock.expects('resolve').withArgs('exampleService').returns(serviceMock.object);

    done();
  });

  afterEach(function(done) {
    sandbox.restore();
    done();
  });

  it('should return a list of Examples when GET /example is requested', function(done) {

    serviceMock.expects('getExamples').resolves(examples);

    request(app)
        .get('/' + basePath + '/example')
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body[0].id.should.equal(1);
          res.body[0].name.should.equal('movies');
          res.body[1].id.should.equal(2);
          res.body[1].name.should.equal('shows');
        })
        .expect(200, done);
  });

  it('should return a Error when GET /example/error is requested', function(done) {

    serviceMock.expects('throwError').rejects('bad');

    request(app)
      .get('/' + basePath + '/example/error')
      .set('Accept', 'application/json')
      .expect(500, done);
  });
});
