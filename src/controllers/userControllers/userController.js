import User from "../../models/userModel.js"
import error from "../../utils/errors/userErrors.js"
import {hashPassword} from "../../config/bcrypt.js"

async function getAllUsers(){
    const users = await User.findAll();

    if(!users) throw new error.USER_NOT_FOUND;
    return users;
}

export const functions = {
    getAllUsers
}

export default functions;