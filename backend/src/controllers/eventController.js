import * as eventService from "../services/eventService.js";
import { createEventSchema } from "../validators/eventValidator.js";
export async function getEvents(req, res) {
  try {
    const events = await eventService.getAllEvents();

    res.status(200).json(events);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve events",
    });

  }
}
export async function createEvent(req, res) {
  try {
    const data = createEventSchema.parse(req.body);

    const event = await eventService.createEvent(data);

    res.status(201).json(event);

  } catch (error) {

    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
}
export async function activateEvent(req, res) {
  try {
    const event = await eventService.setActiveEvent(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to activate event",
    });
  }
}
export async function getEvent(req, res) {
  try {
    const event = await eventService.getEventById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve event",
    });
  }
}
