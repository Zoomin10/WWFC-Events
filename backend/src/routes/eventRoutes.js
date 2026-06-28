import { Router } from "express";
import * as eventController from "../controllers/eventController.js";

const router = Router();
router.get("/active", eventController.getActiveEvent);
router.get("/:id", eventController.getEvent);
router.get("/", eventController.getEvents);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/", eventController.createEvent);
router.patch("/:id/activate", eventController.activateEvent);

export default router;