import { Router } from "express";
import userApiRutes from "./userApiRutes.js"
import authApiController from "../../controllers/authController/authApiController.js"

const router = Router();

router.use("/users", userApiRutes)

router.post("/register", authApiController.register)

export default router;