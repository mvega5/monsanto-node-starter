'use strict';

/**
 * Initialise Items endpoints
 *
 * @param router
 */
module.exports = (router) => {


  /**
   * PODs Collection
   */
  router.get('/', (req, res, next) => {

    let service = req.ioc.resolve('pointOfDeliveryService');
    let log = req.ioc.resolve('logger');

    service.get()
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
