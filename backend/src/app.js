import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "WWFC Events API",
  });
});

app.use("/api/events", eventRoutes);

export default app;