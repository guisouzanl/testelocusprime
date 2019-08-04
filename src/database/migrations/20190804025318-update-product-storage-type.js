module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'storage_value', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('products');
  },
};
