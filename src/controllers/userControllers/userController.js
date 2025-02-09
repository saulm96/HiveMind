import User from "../../models/userModel.js"
import error from "../../utils/errors/userErrors.js"
import {hashPassword} from "../../config/bcrypt.js"

async function getAllUsers(){
    const users = await User.findAll();

    if(!users) throw new error.USER_NOT_FOUND;
    return users;
}

async function deactivateUser(id){
    const user = await User.findByPk(id);

    if(!user) throw new error.USER_NOT_FOUND;
    
    user.user_isActivated = user.user_isActivated === "True" ? "False" : "True";

    await user.save()

    return user;
}

export const functions = {
    getAllUsers,
    deactivateUser
}

export default functions;