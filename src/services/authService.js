import logger from "../utils/logger.js";
import prisma from "../prismaService.js";

export const registerService = async ({
  email,
  password,
  name,
  team_id,
  role = "user",
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        team_id,
        role,
      },
    });
    return user;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const findUserService = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const createTeamService = async (name) => {
  try {
    const team = await prisma.team.create({
      data: {
        name,
      },
    });
    return team;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const getAllTeamsService = async () => {
  try {
    const teams = await prisma.team.findMany();
    return teams;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const loginService = async ({ id, token }) => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const logoutService = async (id) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        token: null,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
