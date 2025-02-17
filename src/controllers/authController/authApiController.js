import authController from "./authController.js";

async function register(req, res) {
    try {
        const result = await authController.register(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: result
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
    register
}

export default functions;
