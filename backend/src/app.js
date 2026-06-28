import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import participantRoutes from "./routes/participantRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
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