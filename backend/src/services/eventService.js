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