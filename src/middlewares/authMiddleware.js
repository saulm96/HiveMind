import {verify} from "../config/jwt.js";

export async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        const decoded = verify(token);
        
        if (decoded.error) {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        if (decoded.purpose !== "authentication") {
            return res.status(401).json({ error: "Invalid token purpose" });
        }
         
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}