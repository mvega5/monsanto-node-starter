'use strict';

const bookshelf = require('../bookshelf');

class PointOfDelivery extends bookshelf.Model {  
    get tableName() {
        return 'pods';
    }

    get hasTimestamps() {
        return true;
    }
}

module.exports = PointOfDelivery;