'use strict'

const route = require('./routes/users');

module.exports = function router(app, db) {
  return route(app, db);
};
