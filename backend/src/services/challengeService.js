import prisma from "../prisma/prisma.js";

export async function getChallengesByEvent(eventId) {
  return prisma.challenge.findMany({
    where: { eventId },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createChallenge(eventId, data) {
  const lastChallenge = await prisma.challenge.findFirst({
    where: { eventId },
    orderBy: { sortOrder: "desc" },
  });

  const nextSortOrder = lastChallenge ? lastChallenge.sortOrder + 1 : 1;

  return prisma.challenge.create({
    data: {
      eventId,
      name: data.name,
      scoringMethod: data.scoringMethod,
      unit: data.unit,
      sortOrder: nextSortOrder,
    },
  });
}
export async function updateChallenge(id, data) {
  return prisma.challenge.update({
    where: { id },
    data: {
      name: data.name,
      scoringMethod: data.scoringMethod,
      unit: data.unit,
    },
  });
}

export async function deleteChallenge(id) {
  return prisma.challenge.delete({
    where: { id },
  });
}