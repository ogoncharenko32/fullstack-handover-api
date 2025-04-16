import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from "ioredis";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import logger from "./utils/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import ticketRouter from "./routes/ticketRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3030;

//Redis
const redisClient = new Redis(
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : {
        host: "localhost",
        port: 6379,
      }
);
redisClient.on("error", (err) => {
  console.log(err);
  logger.error(err);
});
//middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost", "http://138.201.159.116"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  })
);
app.use(express.json());
//RateLimit
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    logger.warn("Rate limit exceeded");
    res.status(429).json({ message: "Rate limit exceeded" });
  },
});
app.use(rateLimiter);

//Logger
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next();
});

//Routes
app.use("/auth", authRouter);
app.use(
  "/browse",
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  // authMiddleware,
  ticketRouter
);

//
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port http://localhost:${PORT}`);
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`Redis is running`);
});
