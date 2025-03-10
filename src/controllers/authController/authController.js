import { UserMethods } from "../../models/user/userMethods.js";
import { generateEmailVerificationToken, verify } from "../../config/jwt.js";
import emailService from "../../services/emailServices/emailService.js";
import error from "../../utils/errors/userErrors.js";


/**
 * Logs in a user using regular login credentials.
 * 
 * @param {object} userData - The data to log in the user with.
 * @param {string} userData.email - The email of the user to log in.
 * @param {string} userData.password - The password of the user to log in.
 * @returns {Promise<User>} - A promise that resolves to the logged in user object.
 * @throws {MISSING_PARAMETERS} - If the email or password is missing.
 * @throws {INVALID_CREDENTIALS_IN_LOGIN} - If the email or password is invalid.
 * @throws {EMAIL_NOT_VERIFIED} - If the user has not verified their email.
 */
async function regularLogin(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        throw new error.MISSING_PARAMETERS();
    }

    const user = await UserMethods.authenticateLocalUser(email, password);
    if (!user) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

    if (user.emailVerified == false) throw new error.EMAIL_NOT_VERIFIED();

    user.lastLogin = new Date();
    return user;
}

/**
 * Registers a new user using regular login credentials.
 * 
 * @param {object} userData - The data to register the user with.
 * @param {string} userData.firstName - The first name of the user to register.
 * @param {string} userData.lastName - The last name of the user to register.
 * @param {string} userData.username - The username of the user to register.
 * @param {string} userData.email - The email of the user to register.
 * @param {string} userData.password - The password of the user to register.
 * @param {string} userData.confirmedPassword - The confirmed password of the user to register.
 * @returns {Promise<User>} - A promise that resolves to the newly registered user object.
 * @throws {MISSING_PARAMETERS} - If any of the required parameters are missing.
 * @throws {EMAIL_OR_USERNAME_ALREADY_IN_USE} - If the email or username is already in use.
 * @throws {PASSWORDS_DONT_MATCH} - If the password and confirmed password do not match.
 */
async function regularRegister(userData) {
    const { firstName, lastName, username, email, password, confirmedPassword } = userData;

    if (!firstName || !lastName || !username || !email || !password || !confirmedPassword) {
        throw new error.MISSING_PARAMETERS();
    }

    const availableUser = await UserMethods.validateEmailAndUsernameAvailability(email, username);
    if (availableUser) throw new error.EMAIL_OR_USERNAME_ALREADY_IN_USE();

    if (password !== confirmedPassword) {
        throw new error.PASSWORDS_DONT_MATCH();
    }
    delete userData.confirmedPassword;

    const newUser = await UserMethods.createUserUsingRegularRegister(userData);
    const verificationToken = generateEmailVerificationToken(newUser.id, email);
    await UserMethods.saveTokenToVerifyEmail(newUser.id, verificationToken);
    await emailService.sendVerificationEmail(email, verificationToken);

    return newUser;
}

async function verifyUserByEmail(token) {
    const decoded = verify(token);
    if (decoded.error || decoded.purpose !== "email_verification") throw new error.INVALID_TOKEN();

    const { userId, email} = decoded;
    
    const user = await UserMethods.verifyEmailToken(userId, token);
    if (!user) throw new error.INVALID_TOKEN();

    if (user.email !== email) throw new error.INVALID_TOKEN();

    if (user.emailVerified) throw new error.EMAIL_ALREADY_VERIFIED();

    user.emailVerified = true;
    await user.save();
    return user;
}


export const functions = {
    regularLogin,
    regularRegister,
    verifyUserByEmail
}

export default functions;


