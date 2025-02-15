import { Op } from "sequelize";
import User from "./userModel.js";
import error from "../../utils/errors/userErrors.js";

class UserMethods {
    static async getUserByUsername(username) {
        const user = await User.findOne({
            where: {
                user_username: {
                    [Op.like]: `%${username}`
                }
            }
        });
        if (!user) throw new error.USER_NOT_FOUND;
        return user;
    }

    static async getUserByEmail(email) {
        const user = await User.findOne({
            where: {
                user_email: email
            }
        })
        if (!user) throw new error.USER_NOT_FOUND;
        return user
    }

    static async getUserById(id) {
        const user = await User.findByPk(id);
        if (!user) throw new error.USER_NOT_FOUND;
        return user;
    }


}

export {UserMethods}
