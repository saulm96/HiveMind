import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, SECRET, { expiresIn });
    return token;
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

export { sign, verify };