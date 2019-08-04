module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('products');
  },
};
