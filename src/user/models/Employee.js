const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
  static get _attributes() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    };
  }

  static get _options() {
    return {
      tableName: 'employees',
    };
  }

  static associate(models) {
    this.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department',
    });
  }
}

module.exports = Employee;
