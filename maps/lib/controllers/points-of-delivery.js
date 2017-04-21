'use strict';

/**
 * Initialise Items endpoints
 *
 * @param router
 */

module.exports = (router) => {

  /**
   * @swagger
   * /points-of-delivery:
   *   get:
   *     tags:
   *       - Point of Delivery
   *     description: Returns all Points of Delivery
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of Points of Delivery
   *         schema:
   *           $ref: '#/definitions/PointOfDelivery'
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
   * @swagger
   * /points-of-delivery/{id}:
   *   get:
   *     tags:
   *       - Point of Delivery
   *     description: Returns a Point of Delivery
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Points of Delivery's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single Point of Delivery
   *         schema:
   *           $ref: '#/definitions/PointOfDelivery'
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
   * @swagger
   * /points-of-delivery:
   *   post:
   *     tags:
   *       - Point of Delivery
   *     description: Creates a Point of Delivery
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: POD
   *         description: POD object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PointOfDelivery'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  router.post('/', (req, res, next) => {

    let service = req.ioc.resolve('pointOfDeliveryService');
    
    delete req.body.id;
    
    service.create(req.body)
      .then((item) => {
        res.json(item);
      })
      .catch(next);
  });

/**
 * @swagger
 * /points-of-delivery/{id}:
 *   put:
 *     tags: 
 *      - Point of Delivery
 *     description: Updates a single Point of Delivery
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: Points of Delivery's id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: POD
 *        in: body
 *        description: Fields for the POD resource
 *        schema:
 *         $ref: '#/definitions/PointOfDelivery'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
  router.put('/:id', (req, res, next) => {

    let service = req.ioc.resolve('pointOfDeliveryService');
    
    delete req.body.id;

    service.updateById(req.params.id,req.body)
      .then((item) => {
        res.json(item);
      })
      .catch(next);
  });

  /**
   * @swagger
   * /points-of-delivery/{id}:
   *   delete:
   *     tags:
   *       - Point of Delivery
   *     description: Deletes a single Point of Delivery
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: POD's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   */
  router.delete('/:id', (req, res, next) => {

    let service = req.ioc.resolve('pointOfDeliveryService');

    service.deleteById(req.params.id)
    .then((item) => {
      res.json(item);
    })
    .catch(next);
  });
};
