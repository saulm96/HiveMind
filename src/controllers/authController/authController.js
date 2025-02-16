import { UserMethods } from "../../models/user/userMethods.js";
import { verifyPassword, hashPassword } from "../../config/bcrypt.js";
import error from "../../utils/errors/userErrors.js";


async function register(name, lastName, username, email, password, confirmedPassword) {
    
    if(password !== confirmedPassword) throw new error.PASSWORD_DONT_MATCH;
    
    const hashedPassword = await hashPassword(password);

    const existingUser = await UserMethods.getUserByEmail(email);

    if (existingUser) throw new error.USER_ALREADY_EXISTS;

    const user = await UserMethods.createUser({
        user_name: name,
        user_last_name: lastName,
        user_username: username,
        user_email: email,
        user_password: hashedPassword
    });
    return user;
}

export const functions = {
    register
}

export default functions;


