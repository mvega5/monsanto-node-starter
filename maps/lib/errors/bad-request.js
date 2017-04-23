'use strict';

module.exports = require('custom-error-generator')('BadRequest', null, function(message, causedBy, errors){
  this.message = message;
  this.causedBy = causedBy;
  this.errors = errors;
});
