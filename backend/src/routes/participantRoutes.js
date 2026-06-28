import { Router } from "express";
import * as participantController from "../controllers/participantController.js";

const router = Router({ mergeParams: true });

router.get("/", participantController.getParticipants);
router.post("/", participantController.createParticipant);

export default router;