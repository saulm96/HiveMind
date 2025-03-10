import { Router } from "express";
import userApiController from "../../controllers/userControllers/userApiController.js"


const router = Router();

router.get("/username=:username", userApiController.getUserByUsername);


export default router;