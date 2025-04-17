import logger from "../utils/logger.js";
import * as ticketService from "../services/ticketsService.js";

export const createShiftController = async (req, res, next) => {
  try {
    // const team_id = req.user.team_id;
    const { name } = req.body;

    const shift = await ticketService.createShiftService(name);

    const keys = await req.redisClient.keys("shifts-*");
    if (keys.length > 0) {
      await req.redisClient.del(keys);
    }

    res.status(201).json({
      status: 201,
      message: "Shift created successfully",
      data: {
        shift,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getAllShifts = async (req, res, next) => {
  try {
    const { date } = req.query;
    const endDate = date + "T23:59:59";
    const shifts = await ticketService.getAllShiftsService(date, endDate);
    res.status(200).json({
      status: 200,
      message: "Shifts fetched successfully",
      data: shifts,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export const getAllShiftsForTeamController = async (req, res, next) => {
  const team_id = req.user.team_id;
  const { take, skip, sort } = req.query;

  try {
    const cachekey = `shifts-${team_id}-${take}-${skip}-${sort}`;
    const cachedShifts = await req.redisClient.get(cachekey);
    if (cachedShifts) {
      logger.info("Fetching shifts from cache");
      return res.status(200).json({
        status: 200,
        message: "Shifts fetched successfully",
        data: JSON.parse(cachedShifts),
      });
    }

    const shifts = await ticketService.getAllShiftsForTeamService({
      team_id,
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      sort: sort || undefined,
    });

    await req.redisClient.setex(cachekey, 300, JSON.stringify(shifts));

    res.status(200).json({
      status: 200,
      message: "Shifts fetched successfully",
      data: shifts,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const createTicketController = async (req, res, next) => {
  const {
    link,
    description,
    status,
    important,
    shift_id,
    user_id,
    user_name = "Unknown user",
  } = req.body;

  if (!shift_id) {
    logger.error("Shift not selected");
    next(error);
  }

  try {
    const ticket = await ticketService.createTicketService({
      link,
      description,
      status,
      important: Boolean(important),
      shift_id,
      user_id,
      user_name,
    });

    const keys = await req.redisClient.keys("ticket-*");
    if (keys.length > 0) {
      await req.redisClient.del(keys);
    }

    res.status(201).json({
      status: 201,
      message: "Ticket created successfully",
      data: {
        ticket,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getTicketsByShiftController = async (req, res, next) => {
  const { shift_id } = req.params;
  const { sort, sort_by } = req.query;
  // const user_id = req.user.id;
  // const team_id = req.user.team_id;

  try {
    // const cachekey = `ticket-${shift_id}`;
    // const cachedTickets = await req.redisClient.get(cachekey);
    // if (cachedTickets) {
    //   logger.info("Fetching tickets from cache");
    //   return res.status(200).json({
    //     status: 200,
    //     message: "Tickets fetched successfully",
    //     data: JSON.parse(cachedTickets),
    //   });
    // }

    const tickets = await ticketService.getTicketsByShiftService({
      shift_id: +shift_id,
      sort,
      sort_by,
    });

    // await req.redisClient.setex(cachekey, 300, JSON.stringify(tickets));

    res.status(200).json({
      status: 200,
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getTicketByIdController = async (req, res, next) => {
  const { id } = req.params;
  const team_id = req.user.team_id;

  try {
    const cachekey = `ticket-${id}`;
    const cachedTicket = await req.redisClient.get(cachekey);
    if (cachedTicket) {
      logger.info("Fetching ticket from cache");
      return res.status(200).json({
        status: 200,
        message: "Ticket fetched successfully",
        data: JSON.parse(cachedTicket),
      });
    }

    const ticket = await ticketService.getTicketByIdService({
      id: +id,
      team_id,
    });

    await req.redisClient.setex(cachekey, 300, JSON.stringify(ticket));

    res.status(200).json({
      status: 200,
      message: "Ticket fetched successfully",
      data: ticket,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateTicketController = async (req, res, next) => {
  const { id } = req.params;
  const { link, description, status, important } = req.body;

  try {
    const ticket = await ticketService.updateTicketService({
      id: +id,
      link,
      description,
      status,
      important,
    });

    res.status(200).json({
      status: 200,
      message: "Ticket updated successfully",
      data: { ticket },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteTicketController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const ticket = await ticketService.deleteTicketService(+id);
    res.status(200).json({
      status: 200,
      message: "Ticket deleted successfully",
      data: { ticket },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
