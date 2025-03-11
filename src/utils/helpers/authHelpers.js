import { UserMethods } from "../../models/user/userMethods.js";
import error from "../../utils/errors/userErrors.js";

export async function saveRefreshToken(userId, userToken){
    const newTokenField = await UserMethods.saveRefreshToken(userId, userToken);
    if(!newTokenField) throw new error.TOKEN_NOT_SAVED();
    return newTokenField;
}

