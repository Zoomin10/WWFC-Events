import prisma from "../prisma/prisma.js";

export async function getAllEvents() {
  return await prisma.event.findMany({
    orderBy: {
      eventDate: "desc",
    },
  });
}

export async function createEvent(eventData) {
  return await prisma.event.create({
    data: eventData,
  });
}
export async function setActiveEvent(eventId) {
  return prisma.$transaction(async (tx) => {
    await tx.event.updateMany({
      data: { isActive: false },
    });

    return tx.event.update({
      where: { id: eventId },
      data: { isActive: true },
    });
  });
}
export async function getEventById(id) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      participants: true,
      challenges: true,
    },
  });
}