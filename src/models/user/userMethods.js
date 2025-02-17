import sequelize from "sequelize";
import User from "./userModel.js";
import error from "../../utils/errors/userErrors.js";

class UserMethods {

    static async getUserByUsernameWithCaseInsensitiveForRegularSearch(username) {
        const user = await User.findAll({
            where: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('username')),
                'LIKE',
                `%${username.toLowerCase()}%`
            )
        });

        if (!user.length) throw new error.USER_NOT_FOUND();
        return user;
    }
    static async getUserByUsernameForRegister(username) {
        const user = await User.findOne({
            where: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('username')),
                '=',
                username.toLowerCase()
            )
        });

        if (!user) throw new error.USER_NOT_FOUND();
        return user;
    }
    static async getUserByEmail(email) {
        const user = await User.findOne({
            where: { email: email },
        });
        return user;
    }

    static async getUserById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    static async createUser(userData) {
        const { firstName, lastName, username, email, password } = userData;

        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });
        return userWithoutPassword;
    }

    static async updateLastLogin(userId) {
        const user = await User.findByPk(userId);
        if (!user) throw new error.USER_NOT_FOUND();

        user.lastLogin = new Date();
        await user.save();
    }
}

export { UserMethods };
