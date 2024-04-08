import { Router } from "express";
import { registerEmailUserController, emailLoginController, magicLoginController, validateLoginMagicLinkController } from "../../controllers/auth.controller.js";
const router = Router();

router.route('/common/signup').post(registerEmailUserController);
router.route('/common/login/').post(emailLoginController);
router.route('/magic/login/').post(magicLoginController);
router.route('/magic/verify/').post(validateLoginMagicLinkController);

export default router;