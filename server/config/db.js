import Sequelize from 'sequelize';
import { config } from 'dotenv-safe';
import { User } from '../models/users.js';

const {
  DB_PORT,
  DB_URL,
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_DIALECT
} = process.env;

const sequelize = new Sequelize( DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  define: {
    timestamps: false
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = User(sequelize, Sequelize);

module.exports = db;
