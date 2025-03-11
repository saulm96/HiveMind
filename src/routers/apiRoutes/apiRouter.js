import { Router } from "express";

import userApiRutes from "./userApiRutes.js"
import authApiRutes from "./authApiRutes.js"

import {isAuthenticated} from "../../middlewares/authMiddleware.js"



const router = Router();

router.use( "/users", isAuthenticated, userApiRutes)
router.use( "/auth", authApiRutes)


export default router;