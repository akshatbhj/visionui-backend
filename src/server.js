import cors from "cors";
import express, { json } from "express";
import { configDotenv } from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "X-UserAPI-Key"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", aiRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "the server is running perfectly✅" });
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on the port: ${port}`);
});
