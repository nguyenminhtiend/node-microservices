const { Model, DataTypes } = require('sequelize');

class Department extends Model {
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
    };
  }

  static get _options() {
    return {
      tableName: 'departments',
    };
  }

  static associate(models) {
    this.hasMany(models.Employee);
  }
}

module.exports = Department;
