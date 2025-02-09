import { DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js"

const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING(90),
        allowNull: false,
    },
    user_lastName: {
        type: DataTypes.STRING(90),
        allowNull: false
    },
    user_username: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    user_dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_phoneNumber: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    user_isActivated: {
        type: DataTypes.ENUM("True", "False"),
        defaultValue: "True",
        allowNull: false
    },
    user_lastLogin: {
        type: DataTypes.DATE,
        allowNull: false
    }
})


export default User;