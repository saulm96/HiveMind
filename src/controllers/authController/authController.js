import { UserMethods } from "../../models/user/userMethods.js";
import { verifyPassword, hashPassword } from "../../config/bcrypt.js";
import error from "../../utils/errors/userErrors.js";



async function register(userData) {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmedPassword
    } = userData;

    // Validate input
    if (!firstName || !lastName || !username || !email || !password || !confirmedPassword) {
        throw new error.MISSING_PARAMETERS();
    }

    if (password !== confirmedPassword) {
        throw new error.PASSWORD_DONT_MATCH();
    }

    // Check username availability
    try {
        const existingUser = await UserMethods.getUserByUsernameForRegister(username);
        if (existingUser) {
            throw new error.USERNAME_ALREADY_EXISTS();
        }
    } catch (err) {
        if (!(err instanceof error.USER_NOT_FOUND)) {
            throw err; // Re-throw unexpected errors
        }
        // Username is available, continue
    }

    // Check email availability
    try {
        const existingEmail = await UserMethods.getUserByEmail(email);
        if (existingEmail) {
            throw new error.EMAIL_ALREADY_EXISTS();
        }
    } catch (err) {
        if (!(err instanceof error.USER_NOT_FOUND)) {
            throw err;
        }
        // Email is available, continue
    }

    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await UserMethods.createUser({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
    });

    return user;
}

export const functions = {
    register
}

export default functions;


