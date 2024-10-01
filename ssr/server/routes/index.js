import { Router } from "express";
import pageRouter from "./page.js";
import detailRouter from "./detail.js";

const router = Router();

router.use("/", pageRouter);
router.use("/detail", detailRouter);

export default router;
