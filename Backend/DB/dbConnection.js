const dbConneccion = async () => {
  const sequelize = require('./config');

  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');


    const Category = require('../models/category');
    const Color = require('../models/color');
    const Material = require('../models/material');
    const Finished = require('../models/finished');
    const Store = require('../models/store');
    const Storage = require('../models/storage');
    const Product = require('../models/product');

    
    Storage.belongsTo(Store, { foreignKey: 'id_store', allowNull: false });
    Storage.belongsTo(Product, { foreignKey: 'id_product', allowNull: false });
    Product.belongsTo(Color, { foreignKey: 'id_color', allowNull: false });
    Product.belongsTo(Material, { foreignKey: 'id_material', allowNull: false });
    Product.belongsTo(Category, { foreignKey: 'id_category', allowNull: false });
    Product.belongsTo(Finished, { foreignKey: 'id_finished', allowNull: false });

    await sequelize.sync();

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = {
  dbConneccion
}