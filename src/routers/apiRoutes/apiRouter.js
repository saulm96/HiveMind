import { Router } from "express";
import userApiRutes from "./userApiRutes.js"
import authApiController from "../../controllers/authController/authApiController.js"

import { isAuthenticated } from "../../middlewares/authMiddleware.js"

const router = Router();

router.use( "/users", userApiRutes)

router.post("/login", authApiController.regularLogin);
router.post("/register", authApiController.regularRegister);

export default router;