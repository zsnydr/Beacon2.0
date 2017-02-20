const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/beacon', {
  dialect: 'postgres'
});

module.exports = db;
