import {verify} from "../config/jwt.js";

export async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
         const decoded = verify(token, process.env.JWT_SECRET);
         req.user = decoded;
         next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}
