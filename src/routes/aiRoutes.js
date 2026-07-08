import express from "express";
import requireApiKey from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate-ui", requireApiKey, (req, res) => {
  const userApi = req.userApiKey;
  const requestBody = req.body;

  res.status(200).json({
    success: true,
    message: "Authentication successfull!",
    keyLength: userApi.length,
    receivedImage: requestBody?.image ? "Yes" : "No",
  });
});

export default router;
