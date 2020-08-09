const { Model, DataTypes } = require('sequelize');
const { v4 } = require('uuid');

class User extends Model {
  static get _attributes() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.TEXT,
      },
    };
  }

  static get _options() {
    return {
      tableName: 'users',
    };
  }
}

module.exports = User;
