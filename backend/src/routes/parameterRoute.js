import express from "express";
import { getUserParameters, saveParameters, getLanguage } from "../controllers/parameterController.js";
import { isLogin } from "../Middleware/isLogin.js";

const router = express.Router();

router.use('/parameter/getUserParameters', isLogin ,getUserParameters);
router.use('/parameter/saveParameters', isLogin , saveParameters);
router.use('/parameter/getLanguage', isLogin , getLanguage);

export default router;
