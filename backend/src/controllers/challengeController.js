import * as challengeService from "../services/challengeService.js";

export async function getChallenges(req, res) {
  try {
    const challenges = await challengeService.getChallengesByEvent(
      req.params.eventId
    );

    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve challenges",
    });
  }
}

export async function createChallenge(req, res) {
  try {
    const challenge = await challengeService.createChallenge(
      req.params.eventId,
      req.body
    );

    res.status(201).json(challenge);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create challenge",
    });
  }
}