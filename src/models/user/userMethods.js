import sequelize from "sequelize";
import { User, UserAuth, UserToken } from "./userIndex.js";
import error from "../../utils/errors/userErrors.js";
import { generateEmailVerificationToken } from "../../config/jwt.js";
import { hashPassword, verifyPassword } from "../../config/bcrypt.js";

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
        if (!user) throw new error.USER_NOT_FOUND();
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
        if (!user || !user.authMethods || !user.authMethods.length) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

        const localAuth = user.authMethods[0];
        const passwordMatch = await verifyPassword(password, localAuth.password);
        if (!passwordMatch) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

        const userObj = user.get({ plain: true });
        delete userObj.authMethods;
        return userObj;
    }

    /**
     * Checks the availability of an email and username.
     * 
     * @param {string} email - The email to verify for availability.
     * @param {string} username - The username to verify for availability.
     * @returns {Promise<void>} - A promise that resolves if both the email and 
     * username are available.
     * @throws {EMAIL_OR_USERNAME_ALREADY_IN_USE} - If either the email or 
     * username is already in use.
     */
    static async validateEmailAndUsernameAvailability(email, username) {
        const user = await User.findOne({
            where: {
                [sequelize.Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });
        if (user) throw new error.EMAIL_OR_USERNAME_ALREADY_IN_USE();
    }

    /**
     * Creates a new user with the given data, using a local auth.
     * 
     * @param {object} userData - The data to create a new user with.
     * @param {string} userData.firstName - The first name of the user to create.
     * @param {string} userData.lastName - The last name of the user to create.
     * @param {string} userData.username - The username of the user to create.
     * @param {string} userData.email - The email of the user to create.
     * @param {string} userData.password - The password of the user to create.
     * @returns {Promise<User>} - A promise that resolves to the newly created user.
     */
    static async createUserUsingRegularRegister(userData) {
        const { firstName, lastName, username, email, password } = userData;

        const t = await User.sequelize.transaction();
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
        }, { transaction: t });

        const hashedPassword = await hashPassword(password);
        await UserAuth.create({
            userId: newUser.id,
            authType: 'local',
            authIdentifier: email,
            password: hashedPassword,
            isActive: true,
        }, { transaction: t });

        await t.commit();

        return newUser;
    }

    static async saveTokenToVerifyEmail(userId, token) {
        const newTokenField = await UserToken.create({
            userId: userId,
            token: token,
            tokenType: "email_verification",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })

        return newTokenField
    }

    static async verifyEmailToken(userId, token) {
        const userToken = await UserToken.findOne({
            where: {
                userId: userId,
                token: token,
                tokenType: "email_verification"
            }
        })

        return userToken
    }
}

export { UserMethods };
