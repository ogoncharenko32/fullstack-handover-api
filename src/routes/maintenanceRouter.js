import { Router } from "express";
import * as maintenanceController from "../controllers/maintenanceController.js";
import {
  maintenanceSchema,
  updateMaintenanceSchema,
  validate,
} from "../utils/validation.js";

const maintenanceRouter = Router();

maintenanceRouter.post(
  "/",
  validate(maintenanceSchema),
  maintenanceController.createNewMaintenanceController
);

maintenanceRouter.get("/", maintenanceController.getAllMaintenancesController);

maintenanceRouter.get(
  "/:id",
  maintenanceController.getMaintenanceByIdController
);

maintenanceRouter.put(
  "/:id",
  validate(updateMaintenanceSchema),
  maintenanceController.updateMaintenanceController
);

maintenanceRouter.delete(
  "/:id",
  maintenanceController.deleteMaintenanceController
);

export default maintenanceRouter;
