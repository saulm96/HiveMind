import { Router } from "express";
import authApiController from "../../controllers/authController/authApiController.js"

const router = Router();

router.post("/login", authApiController.regularLogin);
router.post("/register", authApiController.regularRegister);
 
router.get("/verified-email/:token", authApiController.verifyUserByEmail);

export default router;