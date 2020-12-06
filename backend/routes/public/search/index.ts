import { Router } from "express";
import searchController from "../../../controllers/public/search";

const router = Router();
router.get("/", searchController.search);

export default router;