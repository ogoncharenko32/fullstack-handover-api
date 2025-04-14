import argon2 from "argon2";
import * as authService from "../services/authService.js";
import logger from "../utils/logger.js";
import generateTokens from "../utils/generateTokens.js";

export const registerController = async (req, res, next) => {
  const { email, password, name, team_id, role } = req.body;

  try {
    if (!email || !password || !name || !team_id) {
      logger.error("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await authService.findUserService(email);
    if (existingUser) {
      logger.error("User with this email already exists");
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await authService.registerService({
      email,
      password: hashedPassword,
      name,
      team_id,
      role,
    });

    const { accessToken, refreshToken } = await generateTokens({
      id: user.id,
      email: user.email,
    });

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        team_id: user.team_id,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const createTeamController = async (req, res, next) => {
  const { name } = req.body;

  try {
    const team = await authService.createTeamService(name);
    res.status(201).json({
      status: 201,
      message: "Team created successfully",
      data: {
        id: team.id,
        name: team.name,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getAllTeamsController = async (req, res, next) => {
  try {
    const teams = await authService.getAllTeamsService();
    res.status(200).json({
      status: 200,
      message: "Teams fetched successfully",
      data: teams,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      logger.error("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await authService.findUserService(email);
    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      logger.error("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens({
      id: user.id,
      email: user.email,
    });

    await authService.loginService({ id: user.id, token: accessToken });

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        team_id: user.team_id,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    await authService.logoutService(req.user.id);

    res.status(200).json({
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
