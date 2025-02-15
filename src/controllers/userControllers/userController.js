import {UserMethods} from "../../models/user/userMethods.js"



async function getUserByEmail(email) {
    return await UserMethods.getUserByEmail(email);
}
async function getUserByUsername(username) {
    return await UserMethods.getUserByUsername(username);
}



export const functions = {
    getUserByEmail,
    getUserByUsername,
}

export default functions;