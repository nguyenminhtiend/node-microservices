const { Model, DataTypes } = require('sequelize');
const { v4 } = require('uuid');

class RefreshToken extends Model {
  static get _attributes() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      expireAt: {
        type: DataTypes.DATE,
      },
    };
  }

  static get _options() {
    return {
      tableName: 'refreshTokens',
      timestamps: true,
      updatedAt: false,
    };
  }
}

module.exports = RefreshToken;
