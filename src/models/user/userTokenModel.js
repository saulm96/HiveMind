import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";
import User from "./userModel.js";

class UserToken extends Model {}

UserToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tokenType: {
      type: DataTypes.ENUM('verification', 'password_reset', 'refresh_token'),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "UserToken",
    tableName: "user_tokens",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
    indexes: [
      {
        fields: ['token']
      }
    ]
  }
);

UserToken.belongsTo(User, { foreignKey: 'userId' });

export default UserToken;
