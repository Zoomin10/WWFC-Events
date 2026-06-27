import * as eventService from "../services/eventService.js";

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

    const event = await eventService.createEvent(req.body);

    res.status(201).json(event);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });

  }

}