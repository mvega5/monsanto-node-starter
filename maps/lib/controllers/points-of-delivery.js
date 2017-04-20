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

    service.get()
      .then((items) => {

        res.json(items);

      })
      .catch(next);
  });

  /**
   * PODs Collection
   */
  router.get('/:id', (req, res, next) => {

    let service = req.ioc.resolve('pointOfDeliveryService');

    service.getById(req.params.id)
      .then((item) => {
        res.json(item);
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
