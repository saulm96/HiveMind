import { UserMethods } from "../../models/user/userMethods.js";
import { generateEmailVerificationToken } from "../../config/jwt.js";
import emailService from "../../services/emailServices/emailService.js";
import error from "../../utils/errors/userErrors.js";


async function regularLogin(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        throw new error.MISSING_PARAMETERS();
    }

    const user = await UserMethods.authenticateLocalUser(email, password);
    if (!user) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

    if (user.emailVerified == false) throw new error.EMAIL_NOT_VERIFIED();
    

    return user;
}

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

    delete userData.condirmedPassword;

    const newUser = await UserMethods.createUserUsingRegularRegister(userData);
    const verificationToken = generateEmailVerificationToken(newUser.id);
    const emailVerification = await emailService.sendVerificationEmail(email, verificationToken);

    return newUser;
}

export const functions = {
    regularLogin,
    regularRegister
}

export default functions;


