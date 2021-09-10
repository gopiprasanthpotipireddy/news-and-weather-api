const Promise = require('bluebird');
require("dotenv").config();
const initOptions = {
  promiseLib: Promise,
  capSQL: true
};

let connectionParams = {
    "host": process.env.DB_HOST,
    "user": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": 'techalchemy',
    "port": 5432,
    "allowExitOnIdle": true
  }

const pgp = require('pg-promise')(initOptions);

const db = pgp(connectionParams);

module.exports = { db, pgp };
