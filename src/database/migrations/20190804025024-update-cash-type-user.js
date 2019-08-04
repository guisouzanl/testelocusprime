module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'cash', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
