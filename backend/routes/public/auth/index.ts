import { Router } from "express";
import authController from "../../../controllers/public/auth";

const router = Router();
router.get("/naver", authController.naverCallback);
router.get("/naverLogin", authController.naverRedirection);
export default router;
