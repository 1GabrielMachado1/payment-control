import { Router } from "express";
import authRouter from "./modules/auth/routes/authRoutes";
import usersRouter from "./modules/user/routes/userRoutes";

const router = Router();

router.use(authRouter);
router.use('/users', usersRouter);

export default router
