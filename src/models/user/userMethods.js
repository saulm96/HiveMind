import sequelize from "sequelize";
import {User, UserAuth, UserToken} from "./userIndex.js";
import error from "../../utils/errors/userErrors.js";
import { hashPassword, verifyPassword} from "../../config/bcrypt.js";

class UserMethods {

    /**
     * Retrieves users whose usernames contain the given substring, case-insensitively.
     * 
     * @param {string} username - The substring to search for in usernames.
     * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
     * @throws {USER_NOT_FOUND} - If no users are found with the given substring in their username.
     */

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

    /**
     * Retrieves a user whose username matches the given string, exactly.
     * 
     * @param {string} username - The exact username to search for.
     * @returns {Promise<User>} - A promise that resolves to the user object.
     * @throws {USER_NOT_FOUND} - If no user is found with the given username.
     */
    static async getUserByUsernameWithExactMatchForLogin(username) {
        const user = await User.findOne({
            where: { username: username },
        });
        if(!user) throw new error.USER_NOT_FOUND();
        return user;
    }

    /**
     * Retrieves a user whose username matches the given string, case-insensitively,
     * for the purpose of registering a new user.
     * 
     * @param {string} username - The username to search for.
     * @returns {Promise<User>} - A promise that resolves to the user object.
     * @throws {USER_NOT_FOUND} - If no user is found with the given username.
     */
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

    /**
     * Authenticates a user by checking their email and password against local
     * userauth records.
     * 
     * @param {string} email - The email to search for.
     * @param {string} password - The password to verify.
     * @returns {Promise<User>} - A promise that resolves to the user object with
     * all fields except authMethods.
     * @throws {INVALID_CREDENTIALS_IN_LOGIN} - If the email or password is invalid.
     */
    static async authenticateLocalUser(email, password) {
        const user = await User.findOne({
            where: { email: email },
            include: [{
                model: UserAuth,
                as: 'authMethods',
                where: {
                    authType: 'local',
                    isActive: true
                }
            }]
        });
        if(!user || !user.authMethods || !user.authMethods.length) throw new error.INVALID_CREDENTIALS_IN_LOGIN();
        
        const localAuth = user.authMethods[0];
        const passwordMatch = await verifyPassword(password, localAuth.password);
        if(!passwordMatch) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

        const userObj = user.get({plain: true});
        delete userObj.authMethods;
        return userObj;
    }

    
/*     static async createUserUsingRegularRegister(userData) {
        const { firstName, lastName, username, email, password } = userData;
        const t = await sequelize.Transaction();

        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            emailVerified: false,
        }, {transaction: t});

        const hashedPassword = await hashPassword(password);
        await UserAuth.create({
            userId: newUser.id,
            authType: 'local',
            authIdentifier: email,
            password: hashedPassword,
            isActive: true,
        }, {transaction: t});

        await t.commit();

        return newUser;
    } */
}

export { UserMethods };
