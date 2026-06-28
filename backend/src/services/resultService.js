import prisma from "../prisma/prisma.js";

export async function getResultsByEvent(eventId) {
  return prisma.result.findMany({
    where: {
      participant: {
        eventId,
      },
    },
    include: {
      participant: true,
      challenge: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createResult(eventId, data) {
  const participant = await prisma.participant.findUnique({
    where: {
      eventId_entryNumber: {
        eventId,
        entryNumber: Number(data.entryNumber),
      },
    },
  });

  if (!participant) {
    throw new Error("Participant not found");
  }

  return prisma.result.create({
    data: {
      participantId: participant.id,
      challengeId: data.challengeId,
      score: Number(data.score),
      adjustedScore: data.adjustedScore
        ? Number(data.adjustedScore)
        : null,
    },
    include: {
      participant: true,
      challenge: true,
    },
  });
}