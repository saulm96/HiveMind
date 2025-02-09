import { Router } from "express";
import userApiRutes from "./userApiRutes.js"

const router = Router();

router.use("/users", userApiRutes)

export default router;