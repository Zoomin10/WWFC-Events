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
  let participant;

  if (data.participantId) {
    participant = await prisma.participant.findFirst({
      where: {
        id: data.participantId,
        eventId,
      },
    });
  } else {
    participant = await prisma.participant.findFirst({
      where: {
        eventId,
        entryNumber: Number(data.entryNumber),
      },
    });
  }

  if (!participant) {
    throw new Error("Participant not found");
  }

  return prisma.result.create({
    data: {
      eventId,
      participantId: participant.id,
      challengeId: data.challengeId,
      score: Number(data.score),
    },
    include: {
      participant: true,
      challenge: true,
    },
  });
}
export async function updateResult(id, data) {
  return prisma.result.update({
    where: { id },
    data: {
      score: Number(data.score),
    },
    include: {
      participant: true,
      challenge: true,
    },
  });
}

export async function deleteResult(id) {
  return prisma.result.delete({
    where: { id },
  });
}