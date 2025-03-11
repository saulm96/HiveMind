import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function generateAuthToken(userId, username, email) {
    const payload = {
        id: userId,
        username,
        email,
        purpose: "refresh_token"
    };
    console.log('Payload a firmar:', payload);
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h"
    });
}
function generateEmailVerificationToken(userId, email) {
    return jwt.sign({
        id: userId,
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