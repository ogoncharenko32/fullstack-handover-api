import { Router } from "express";
import * as ticketsController from "../controllers/ticketsController.js";
import {
  ticketSchema,
  updateTicketSchema,
  validate,
} from "../utils/validation.js";

const ticketRouter = Router();

ticketRouter.post("/shift", ticketsController.createShiftController);
ticketRouter.get("/shift", ticketsController.getAllShifts);

ticketRouter.get(
  "/shift/:shift_id",
  ticketsController.getTicketsByShiftController
);

ticketRouter.post(
  "/ticket",
  validate(ticketSchema),
  ticketsController.createTicketController
);

ticketRouter.get("/ticket/:id", ticketsController.getTicketByIdController);

ticketRouter.put(
  "/ticket/:id",
  validate(updateTicketSchema),
  ticketsController.updateTicketController
);

ticketRouter.delete("/ticket/:id", ticketsController.deleteTicketController);

export default ticketRouter;
