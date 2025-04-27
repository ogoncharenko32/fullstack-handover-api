import logger from "../utils/logger.js";

import * as maintenanceService from "../services/maintenanceService.js";

export const createNewMaintenanceController = async (req, res, next) => {
  console.log(req.body);

  if (!req.body) {
    logger.error("No data provided");
    return res.status(400).json({ message: "No data provided" });
  }
  try {
    const mw = await maintenanceService.createNewMaintenanceService(req.body);

    res
      .status(200)
      .json({ status: 200, message: "Maintenance created", data: mw });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getAllMaintenancesController = async (req, res, next) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenancesService();

    res.status(200).json({
      status: 200,
      message: "Maintenances fetched successfully",
      data: maintenances,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getMaintenanceByIdController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    logger.error("No id provided");
    return res.status(400).json({ message: "No id provided" });
  }
  try {
    const maintenance = await maintenanceService.getMaintenanceByIdService(+id);

    if (!maintenance) {
      logger.error("Maintenance with this Id not found");
      return res
        .status(404)
        .json({ status: 404, message: "Maintenance with this Id not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Maintenance fetched successfully",
      data: maintenance,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateMaintenanceController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    logger.error("No id provided");
    return res.status(400).json({ message: "No id provided" });
  }
  try {
    const maintenance = await maintenanceService.updateMaintenanceService({
      id: +id,
      ...req.body,
    });
    if (!maintenance) {
      logger.error("Maintenance with this Id not found");
      return res
        .status(404)
        .json({ status: 404, message: "Maintenance with this Id not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Maintenance updated successfully",
      data: maintenance,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteMaintenanceController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    logger.error("No id provided");
    return res.status(400).json({ message: "No id provided" });
  }
  try {
    const maintenance = await maintenanceService.deleteMaintenanceService(+id);
    if (!maintenance) {
      logger.error("Maintenance with this Id not found");
      return res
        .status(404)
        .json({ status: 404, message: "Maintenance with this Id not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Maintenance deleted successfully",
      data: maintenance,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
