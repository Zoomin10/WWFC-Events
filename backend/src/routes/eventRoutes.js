import { Router } from "express";
import * as eventController from "../controllers/eventController.js";

const router = Router();

router.get("/", eventController.getEvents);

router.post("/", eventController.createEvent);

export default router;