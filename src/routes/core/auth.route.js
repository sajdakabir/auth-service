import { Router } from "express";
import { registerEmailUserController } from "../../controllers/core/auth.controller.js";
const router = Router();

router.route('/common/signup').post(registerEmailUserController);

export default router;