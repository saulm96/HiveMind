import { Router } from "express";
import userApiController from "../../controllers/userControllers/userApiController.js"
import authApiController from "../../controllers/authController/authApiController.js"


const router = Router();

router.get("/username=:username", userApiController.getUserByUsername);

router.post("/register", authApiController.register)



export default router;