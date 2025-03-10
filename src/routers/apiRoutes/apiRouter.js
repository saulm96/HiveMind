import { Router } from "express";
import userApiRutes from "./userApiRutes.js"
import authApiRutes from "./authApiRutes.js"



const router = Router();

router.use( "/users", userApiRutes)
router.use( "/auth", authApiRutes)


export default router;