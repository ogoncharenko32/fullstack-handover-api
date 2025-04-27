import prisma from "../prismaService.js";
import logger from "../utils/logger.js";

export const createNewMaintenanceService = async (payload) => {
  try {
    const mw = await prisma.maintenance.create({
      data: payload,
    });
    return mw;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getAllMaintenancesService = async () => {
  try {
    const maintenances = await prisma.maintenance.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return maintenances;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getMaintenanceByIdService = async (id) => {
  try {
    const maintenance = await prisma.maintenance.findUnique({
      where: {
        id,
      },
    });

    return maintenance;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const updateMaintenanceService = async (payload) => {
  try {
    const maintenance = await prisma.maintenance.update({
      where: {
        id: payload.id,
      },
      data: payload,
    });
    return maintenance;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const deleteMaintenanceService = async (id) => {
  try {
    const maintenance = await prisma.maintenance.delete({
      where: {
        id,
      },
    });
    return maintenance;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
