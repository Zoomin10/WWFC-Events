import { Router } from "express";
import * as challengeController from "../controllers/challengeController.js";

const router = Router({ mergeParams: true });

router.get("/", challengeController.getChallenges);
router.post("/", challengeController.createChallenge);
router.put("/:challengeId", challengeController.updateChallenge);
router.delete("/:challengeId", challengeController.deleteChallenge);

export default router;