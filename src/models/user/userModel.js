import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 45],
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        isNumeric: true, 
      },
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: "User", 
    tableName: "users",
    timestamps: false, 
  }
);

export default User;