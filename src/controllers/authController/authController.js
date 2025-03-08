import { UserMethods } from "../../models/user/userMethods.js";
import error from "../../utils/errors/userErrors.js";


async function regularLogin(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        throw new error.MISSING_PARAMETERS();
    }

    const user = await UserMethods.authenticateLocalUser(email, password);
    if (!user) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

    return user;
}

async function regularRegister(userData) {
    const { firstName, lastName, username, email, password, confirmedPassword } = userData;

    if (!firstName || !lastName || !username || !email || !password || !confirmedPassword) {
        throw new error.MISSING_PARAMETERS();
    }
    

    if (password !== confirmedPassword) {
        throw new error.PASSWORDS_DONT_MATCH();
    }

    delete userData.condirmedPassword;

    return await UserMethods.createUserUsingRegularRegister(userData);
}

export const functions = {
    regularLogin,
    regularRegister
}

export default functions;


