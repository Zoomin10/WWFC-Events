import prisma from "../prisma/prisma.js";

export async function getParticipantsByEvent(eventId) {
  return prisma.participant.findMany({
    where: { eventId },
    orderBy: { entryNumber: "asc" },
  });
}

export async function createParticipant(eventId, data) {
  const lastParticipant = await prisma.participant.findFirst({
    where: { eventId },
    orderBy: { entryNumber: "desc" },
  });

  const nextEntryNumber = lastParticipant
    ? lastParticipant.entryNumber + 1
    : 1;

  return prisma.participant.create({
    data: {
      eventId,
      entryNumber: nextEntryNumber,
      firstName: data.firstName,
      surname: data.surname,
      schoolYear: data.schoolYear,
    },
  });
}