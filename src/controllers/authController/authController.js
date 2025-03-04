import { UserMethods } from "../../models/user/userMethods.js";
import { verifyPassword, hashPassword } from "../../config/bcrypt.js";
import error from "../../utils/errors/userErrors.js";



async function regularRegister(userData) {
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

    const existingUser = await UserMethods.getUserByUsernameForRegister(username);

    if (existingUser) {
        throw new error.USERNAME_ALREADY_EXISTS();
    }

    const existingEmail = await UserMethods.getUserByEmail(email);

    if (existingEmail) {
        throw new error.EMAIL_ALREADY_EXISTS();
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

async function regularLogin(userData) {
    const { username, password } = userData;

    // Validate input
    if (!username || !password) {
        throw new error.MISSING_PARAMETERS();
    }
    const user = await UserMethods.getUserByUsernameWithExactMatchForLogin(username);
    const passwordMatch = await verifyPassword(password, user.password);

    if (!user) {
        throw new error.INVALID_CREDENTIALS_IN_LOGIN();
    }

    if (!passwordMatch) {
        throw new error.INVALID_CREDENTIALS_IN_LOGIN();
    }

    return user;
}


export const functions = {
    regularRegister,
    regularLogin
}

export default functions;


