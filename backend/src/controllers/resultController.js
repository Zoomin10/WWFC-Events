import * as resultService from "../services/resultService.js";

export async function getResults(req, res) {
  try {
    const results = await resultService.getResultsByEvent(req.params.eventId);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve results" });
  }
}

export async function createResult(req, res) {
  try {
    const result = await resultService.createResult(
      req.params.eventId,
      req.body
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Failed to create result" });
  }
}
export async function updateResult(req, res) {
  try {
    const result = await resultService.updateResult(
      req.params.resultId,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update result" });
  }
}

export async function deleteResult(req, res) {
  try {
    await resultService.deleteResult(req.params.resultId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete result" });
  }
}
