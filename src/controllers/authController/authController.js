import { UserMethods } from "../../models/user/userMethods.js";
import {sign} from "../../config/jwt.js";
import error from "../../utils/errors/userErrors.js";


async function regularLogin(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        throw new error.MISSING_PARAMETERS();
    }

    const user = await UserMethods.authenticateLocalUser(email, password);
    if(!user) throw new error.INVALID_CREDENTIALS_IN_LOGIN();

    return user;
}


export const functions = {
    regularLogin
}

export default functions;


