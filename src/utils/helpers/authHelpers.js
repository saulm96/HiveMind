import { UserMethods } from "../../models/user/userMethods.js";
import error from "../../utils/errors/userErrors.js";

export async function saveRefreshToken(userId, userToken){
    const newTokenField = await UserMethods.saveRefreshToken(userId, userToken);
    if(!newTokenField) throw new error.TOKEN_NOT_SAVED();
    return newTokenField;
}

export async function verifyRefreshTokenDuration(decodedExp){
    const actualDate = Math.floor(Date.now() / 1000); //Time in seconds
    const timeToExpire = decodedExp - actualDate;
    console.log("Time to expire: ", timeToExpire);
    const fifteenMinutes = 900; //15 minutes in seconds
    console.log("Difference: ", (timeToExpire - fifteenMinutes) * 1000);

    return timeToExpire < fifteenMinutes;
}

export async function generateAndSaveCSRFTokens(userId){
    const csrfToken = await UserMethods.generateAndSaveCSRFTokens(userId);
    if(!csrfToken) throw new error.TOKEN_NOT_SAVED();
    return csrfToken;
}

