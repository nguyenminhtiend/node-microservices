module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('employees', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    departmentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'departments',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('employees'),
};
