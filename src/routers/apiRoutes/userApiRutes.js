import { Router } from "express";
import userApiController from "../../controllers/userControllers/userApiController.js"


const router = Router();

router.get("/list", userApiController.getAllUsers);


export default router;