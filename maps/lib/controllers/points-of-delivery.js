'use strict';

const ResourceController = require('../commons/resource-controller');

/**
 * Initialise Items endpoints
 *
 * @param router
 */

module.exports = (router) => {
  let resource = new ResourceController('pointOfDeliveryService').bindAll();

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
   *           type: array
   *           items: 
   *            $ref: '#/definitions/PointOfDelivery'
   */
  router.get('/', resource.get);

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
  router.get('/:id', resource.getById);

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
   *          type: object
   *          properties:
   *             name:
   *               type: string
   *          additionalProperties: false
   *          required:
   *            - name
   *     responses:
   *       200:
   *         description: Successfully created
   *         schema:
   *           $ref: '#/definitions/PointOfDelivery'
   */
  router.post('/', resource.create);

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
 *      - name: POD
 *        in: body
 *        description: Fields for the POD resource
 *        schema:
 *          type: object
 *          properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *          additionalProperties: false
 *      - name: id
 *        description: Points of Delivery's id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/PointOfDelivery'
 */
  router.put('/:id', resource.updateById);

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
  router.delete('/:id', resource.deleteById);
};
