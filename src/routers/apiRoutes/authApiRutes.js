import { Router } from "express";
import authApiController from "../../controllers/authController/authApiController.js"

const router = Router();
router.get("/verify-email/:token", authApiController.verifyUserByEmail);

router.post("/login", authApiController.regularLogin);
router.post("/register", authApiController.regularRegister);
 

export default router;