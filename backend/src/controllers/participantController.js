import * as participantService from "../services/participantService.js";

export async function getParticipants(req, res) {
  try {
    const participants = await participantService.getParticipantsByEvent(
      req.params.eventId
    );

    res.status(200).json(participants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve participants",
    });
  }
}

export async function createParticipant(req, res) {
  try {
    const participant = await participantService.createParticipant(
      req.params.eventId,
      req.body
    );

    res.status(201).json(participant);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create participant",
    });
  }
}