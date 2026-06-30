import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import participantRoutes from "./routes/participantRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/events/:eventId/participants", participantRoutes);
app.use("/api/events/:eventId/challenges", challengeRoutes);
app.use("/api/events/:eventId/results", resultRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "WWFC Events API",
  });
});

app.use("/api/events", eventRoutes);

export default app;