import express, { json } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({"message": "the server is running perfectly✅"})
})

app.listen(port, () => {
  console.log(`🚀 Server is listening on the port: ${port}`);
});

