const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pisipbackend', process.env.USER, process.env.PASSWORD, {
  host: "127.0.0.1",
  dialect: 'mysql',
});

module.exports = sequelize;