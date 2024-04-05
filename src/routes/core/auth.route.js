import { Router } from "express";
import { registerEmailUserController, emailLoginController } from "../../controllers/auth.controller.js";
const router = Router();

router.route('/common/signup').post(registerEmailUserController);
router.route('/common/login/').post(emailLoginController);

export default router;