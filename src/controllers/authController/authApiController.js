import authController from "./authController.js";
import { sign } from "../../config/jwt.js";

async function regularLogin(req, res) {
    try {
        const validUser = await authController.regularLogin(req.body);

        const userToken = sign({
            id: validUser.id,
            username: validUser.username,
            email: validUser.email,
        });

        res.cookie('token', userToken, {
            httpOnly: true,
            samsesite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: validUser
        });
    } catch (error) {
        const statusCode = error.status || 500;
        const message = error.message || 'Internal server error';

        res.status(statusCode).json({
            success: false,
            error: message
        });
    }
}

export const functions = {
    regularLogin
}

export default functions;
