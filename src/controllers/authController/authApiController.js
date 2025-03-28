import authController from "./authController.js";
import { saveRefreshToken, generateAndSaveCSRFTokens } from "../../utils/helpers/authHelpers.js";
import { generateAuthToken, verify } from "../../config/jwt.js";

async function regularLogin(req, res) {
    try {
        const validUser = await authController.regularLogin(req.body);

        const userToken = generateAuthToken(
            validUser.id,
            validUser.username,
            validUser.email,
        );

        res.cookie('token', userToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });

        await saveRefreshToken(validUser.id, userToken)
        const csrfToken = await generateAndSaveCSRFTokens(validUser.id);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: validUser,
            csrfToken: csrfToken
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

async function regularRegister(req, res) {
    try {
        const registeredUser = await authController.regularRegister(req.body);
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user: registeredUser
        });
    } catch (error) {
        console.error(error);
        const statusCode = error.status || 500;
        const message = error.message || 'Internal server error';

        res.status(statusCode).json({
            success: false,
            error: message
        });
    }
}

async function verifyUserByEmail(req, res) {
    try {
        const token = req.params.token;
        await authController.verifyUserByEmail(token);
    } catch (error) {
        console.error(error);
        const statusCode = error.status || 500;
        const message = error.message || 'Internal server error';

        res.status(statusCode).json({
            success: false,
            error: message
        });
    }
}

async function checkTokenForAuthContext(req, res) {
    const token = req.cookies.token;
    if (!token) return res.json({ isValid: false });
    try {
        verify(token);
        res.status(200).json({ isValid: true });
    } catch (error) {
        res.status(401).json({ isValid: false });
    }
}
export const functions = {
    regularLogin,
    regularRegister,
    verifyUserByEmail,
    checkTokenForAuthContext
}

export default functions;
