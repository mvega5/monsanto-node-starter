'use strict';

const bookshelf = require('../bookshelf');

/**
 * @swagger
 * definition:
 *   PointOfDelivery:
 *     properties:
 *       name:
 *         type: string
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