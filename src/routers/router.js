import { Router } from "express";
import apiRouter from "./apiRoutes/apiRouter.js"

const router = Router();

router.use("/", apiRouter)

export default router;