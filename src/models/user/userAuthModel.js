import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";
import User from "./userModel.js";

class UserAuth extends Model {}

UserAuth.init(
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
    authType: {
      type: DataTypes.ENUM('local', 'google', 'facebook'),
      allowNull: false,
    },
    authIdentifier: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: [8, 150],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserAuth",
    tableName: "user_auth",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'authType']
      }
    ]
  }
);

UserAuth.belongsTo(User, { foreignKey: 'userId' });

export default UserAuth;