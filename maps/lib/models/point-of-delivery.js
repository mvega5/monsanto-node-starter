'use strict';

const bookshelf = require('../bookshelf');
/**
 * @swagger
 * definitions:
 *   PointOfDelivery:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       created_at:
 *         type: integer
 *         format: int64
 *       updated_at:
 *         type: integer
 *         format: int64
 */
class PointOfDelivery extends bookshelf.Model {  
    get tableName() {
        return 'pods';
    }

    get hasTimestamps() {
        return true;
    }
}

module.exports = PointOfDelivery;