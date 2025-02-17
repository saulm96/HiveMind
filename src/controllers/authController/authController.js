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
    
    if(password !== confirmedPassword) {
        throw new error.PASSWORD_DONT_MATCH();
    }
    
    try {
        await UserMethods.getUserByUsername(username);
        throw new error.USERNAME_ALREADY_EXISTS();
    } catch (err) {
        if (!(err instanceof error.USER_NOT_FOUND)) throw err;
    }

    // Verificar email existente
    try {
        await UserMethods.getUserByEmail(email);
        throw new error.EMAIL_ALREADY_EXISTS();
    } catch (err) {
        if (!(err instanceof error.USER_NOT_FOUND)) throw err;
    }

    const hashedPassword = await hashPassword(password);

    // Crear usuario
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


