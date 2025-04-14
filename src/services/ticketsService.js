import prisma from "../prismaService.js";
import logger from "../utils/logger.js";

export const createShiftService = async (name) => {
  try {
    const shift = await prisma.shift.create({
      data: {
        name,
      },
    });
    return shift;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getAllShiftsForTeamService = async ({
  team_id,
  take = 10,
  skip = 0,
  sort = "desc",
}) => {
  const totalShifts = await prisma.shift.count({
    where: {
      team_id,
    },
  });

  const totalPages = Math.ceil(totalShifts / take);
  const page = Math.floor(skip / take + 1);

  try {
    const shifts = await prisma.shift.findMany({
      where: {
        team_id,
      },
      orderBy: {
        created_at: sort,
      },
      take,
      skip,
    });

    return {
      shifts,
      totalShifts,
      totalPages,
      page,
    };
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getAllShiftsService = async (date, endDate) => {
  try {
    const shifts = await prisma.shift.findMany({
      where: {
        created_at: {
          gte: new Date(date).toISOString(),
          lte: new Date(endDate).toISOString(),
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return shifts;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getTicketsByShiftService = async ({
  shift_id,
  sort = "asc",
  user_id,
  team_id,
}) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        shift_id,
        user_id,
        team_id,
      },
      orderBy: {
        created_at: sort,
      },
    });
    return tickets;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getTicketByIdService = async ({ id, team_id }) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
        team_id,
      },
    });
    if (!ticket) {
      logger.error("Ticket not found");
      throw new Error("Ticket not found");
    }
    return ticket;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
export const createTicketService = async (ticket) => {
  try {
    const newTicket = await prisma.ticket.create({
      data: ticket,
    });
    return newTicket;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const updateTicketService = async (ticket) => {
  try {
    const ticketExists = await prisma.ticket.findUnique({
      where: {
        id: ticket.id,
      },
    });
    if (!ticketExists) {
      logger.error("Ticket not found");
      throw new Error("Ticket not found");
    }

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: ticket,
    });

    return updatedTicket;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const deleteTicketService = async (ticket_id) => {
  try {
    const ticketExists = await prisma.ticket.findUnique({
      where: {
        id: ticket_id,
      },
    });
    if (!ticketExists) {
      logger.error("Ticket not found");
      throw new Error("Ticket not found");
    }

    await prisma.ticket.delete({
      where: {
        id: ticket_id,
      },
    });
    return ticketExists;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
