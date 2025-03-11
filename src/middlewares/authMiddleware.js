import { verify, generateAuthToken } from "../config/jwt.js";
import {UserMethods} from "../models/user/userMethods.js";

export async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = verify(token);
        if (decoded.error || decoded.purpose !== "refresh_token") {
            return res.status(401).json({ error: "Unauthorized" });
        }

        await UserMethods.markRefreshTokenAsUsed(decoded.id);

        const newUserToken = generateAuthToken(decoded.id, decoded.username, decoded.email);
        await UserMethods.saveRefreshToken(decoded.id, newUserToken);

        res.cookie("token", newUserToken, {
            httpOnly: true,
            sameSite: 'strict', // Corregido el typo
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}