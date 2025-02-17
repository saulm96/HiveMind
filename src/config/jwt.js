import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv
const SECRET = process.env.JWT_SECRET;

function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, SECRET, { expiresIn });
    return token;
}

function verify(token) {
    try {
        const response = jwr - verify(token, SECRET);
        return response;
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

export { sign, verify };