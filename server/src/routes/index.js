import express from "express";

import userRouter from "./userRouter.js";
import exercisesRouter from "./exercisesRouter.js";

const router = express.Router();

router.use(userRouter);
router.use(exercisesRouter);

export default router;
