import { Router } from "express";
import userApiController from "../../controllers/userControllers/userApiController.js"
import authApiController from "../../controllers/authController/authApiController.js"


const router = Router();

router.get("/username=:username", userApiController.getUserByUsername);



//Auth routers
router.post("/register", authApiController.regularRegister)
router.post("/login", authApiController.regularLogin)



export default router;