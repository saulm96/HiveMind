import { Router } from "express";
import userApiController from "../../controllers/userControllers/userApiController.js"


const router = Router();

router.get("/list", userApiController.getAllUsers);

router.get("/username=/:username", userApiController.getUserByUsername);

router.put("/deactivate/:user_id", userApiController.deactivateUser)


export default router;