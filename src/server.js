import cors from "cors";
import express, { json } from "express";
import { configDotenv } from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "X-UserAPI-Key"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json());

app.use("/api", aiRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "the server is running perfectly✅" });
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on the port: ${port}`);
});
