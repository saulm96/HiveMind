import { verify, generateAuthToken } from "../config/jwt.js";
import { UserMethods } from "../models/user/userMethods.js";
import { verifyRefreshTokenDuration } from "../utils/helpers/authHelpers.js";


export async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = verify(token);
        if (decoded.error || decoded.purpose !== "refresh_token") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const isExpiringSoon = verifyRefreshTokenDuration(decoded.exp);

        if (!isExpiringSoon) {
            await UserMethods.markRefreshTokenAsUsed(decoded.id);

            const newUserToken = generateAuthToken(decoded.id, decoded.username, decoded.email);
            await UserMethods.saveRefreshToken(decoded.id, newUserToken);

            res.cookie("token", newUserToken, {
                httpOnly: true,
                sameSite: 'strict', // Corregido el typo
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                path: '/',
            });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}

export async function csrfVerify(req, res, next) {
    try {
        const token = req.headers["csrf-token"];
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const savedToken = await UserMethods.verifyCSRFToken(req.user.id, token);
        if (token !== savedToken) return res.status(401).json({ error: "Unauthorized" });

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}