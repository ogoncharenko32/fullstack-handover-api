import logger from "../utils/logger.js";
import prisma from "../prismaService.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  logger.info("Auth middleware");
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error("Access token is missing");
    return res.status(401).json({ message: "Access token is missing" });
  }

  const decodedUser = jwt.decode(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: decodedUser.id },
  });
  if (!user) {
    logger.error("User with this access token not found");
    return res
      .status(404)
      .json({ message: "User with this access token not found" });
  }

  if (user.token !== token) {
    logger.error("Access token for this user not valid");
    return res
      .status(404)
      .json({ message: "Access token for this user not valid" });
  }

  req.user = user;

  next();
};

export default authMiddleware;
