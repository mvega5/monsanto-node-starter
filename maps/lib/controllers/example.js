'use strict';

const log     = require('../logger');

/**
 * Initialise Items endpoints
 *
 * @param router
 */
module.exports = (router) => {


  /**
   * Example Collection
   */
  router.get('/', (req, res, next) => {

    let service = req.ioc.resolve('exampleService');

    service.getExamples()
      .then((items) => {

        log.info('Correlation identifier generated', { correlationId: res.locals.correlationId });

        res.cacheControl({ maxAge: 10});
        res.json(items);
      })
      .catch(next);
  });

  /**
   * Example Error handling
   */
  router.get('/error', (req, res, next) => {
    
    service.throwError().catch(next);
  });
};
