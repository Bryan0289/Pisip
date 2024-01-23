const { DataTypes } = require('sequelize');

const sequelize = require('../DB/config'); 

const Store= require('./store');
const Product= require('./product');

const Storage = sequelize.define('Storage', {
    id_store: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lot: {
        type: DataTypes.INTEGER,
        defaultValue: true
    },
});

Storage.belongsTo(Store, { foreignKey: 'id_store',as:'Store', allowNull: false });
Storage.belongsTo(Product, { foreignKey: 'id_product',as:'Product', allowNull: false });




module.exports = Storage;