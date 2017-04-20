'use strict';

const knexfile = require('../knexfile');

let config;

switch(process.env.NODE_ENV){
    case 'production':
        config = knexfile.production;
        break;
    case 'staging':
        config = knexfile.staging;
        break;
    case 'development':
    default:
        config = knexfile.development;
        break;
}

var knex = require('knex')(config);

module.exports = require('bookshelf')(knex);
