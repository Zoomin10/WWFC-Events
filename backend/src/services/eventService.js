import prisma from "../prisma/prisma.js";

export async function getAllEvents() {
  return await prisma.event.findMany({
    orderBy: {
      eventDate: "asc",
    },
    include: {
      participants: {
        include: {
          results: true,
        },
      },
      challenges: true,
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
      participants: {
        include: {
          results: true,
        },
      },
      challenges: true,
    },
  });
}
export async function getActiveEvent() {
  return prisma.event.findFirst({
    where: {
      isActive: true,
      isArchived: false,
    },
    include: {
      participants: true,
      challenges: true,
    },
  });
}
export async function updateEvent(id, data) {
  return prisma.event.update({
    where: { id },
    data: {
      name: data.name,
      location: data.location,
      eventDate: new Date(data.eventDate),
    },
  });
}

export async function deleteEvent(id) {
  return prisma.event.delete({
    where: { id },
  });
}
