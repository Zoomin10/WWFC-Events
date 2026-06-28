import { Router } from "express";
import * as resultController from "../controllers/resultController.js";

const router = Router({ mergeParams: true });

router.get("/", resultController.getResults);
router.post("/", resultController.createResult);

export default router;