import User from "../../models/userModel.js"
import error from "../../utils/errors/userErrors.js"
import { Op } from "sequelize";

//User getters:
async function getAllUsers() {
    const users = await User.findAll();

    if (!users) throw new error.USER_NOT_FOUND;
    return users;
}

async function getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new error.USER_NOT_FOUND;
    return user;
}
/**
 * Finds a user by username.
 *
 * @param {string} username - The username to search for.
 *
 * @returns {Promise<User>} The user with the given username.
 *
 * @throws {error.USER_NOT_FOUND} If no user with the given username is found.
 */
async function getUserByUsername(username) {
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
async function getUserByEmail(email) {
    const user = await User.findOne({
        where: {
            user_email: email
        }
    })
    if (!user) throw new error.USER_NOT_FOUND;
    return user
}



//User setters:
async function deactivateUser(id) {
    const user = await User.findByPk(id);

    if (!user) throw new error.USER_NOT_FOUND;

    user.user_isActivated = user.user_isActivated === "True" ? "False" : "True";

    await user.save()

    return user;
}

//User updaters:
async function updateUser(id, data) {
    const user = await User.findByPk(id);

    if (!user) throw new error.USER_NOT_FOUND;

    for (const key in data) {
        user[key] = data[key];
    }
    await user.save();
   return user;
}


export const functions = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    deactivateUser
}

export default functions;