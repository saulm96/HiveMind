import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function generateAuthToken(userId, username, email) {
    return jwt.sign({
        userId,
        username,
        email,
        purpose: "authentication"
    }, SECRET, {
        expiresIn: "1h"
    })
}
function generateEmailVerificationToken(userId, email) {
    return jwt.sign({
        userId,
        email,
        purpose: "email_verification"
    }, SECRET, {
        expiresIn: "24h"
    })
}
function verify(token) {
    try {
        const response = jwt.verify(token, SECRET);
        return response;
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

export { verify, generateAuthToken, generateEmailVerificationToken };