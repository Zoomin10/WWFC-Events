import { Router } from "express";
import * as resultController from "../controllers/resultController.js";

const router = Router({ mergeParams: true });

router.get("/", resultController.getResults);
router.post("/", resultController.createResult);
router.put("/:resultId", resultController.updateResult);
router.delete("/:resultId", resultController.deleteResult);

export default router;