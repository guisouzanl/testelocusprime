module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'storage_value', {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: '0',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
