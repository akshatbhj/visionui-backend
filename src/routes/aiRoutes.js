import express from "express";
import requireApiKey from "../middlewares/auth.js";
import {
  generateUISchemaService,
  applyThemeToUIService,
} from "../services/ai.service.js";

const router = express.Router();

router.post("/generate-ui", requireApiKey, async (req, res) => {
  const userApi = req.userApiKey;
  const requestBody = req.body || {};

  if (!requestBody.image) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: no base64 image provided.",
    });
  }

  try {
    const generatedUI = await generateUISchemaService(
      requestBody.image,
      userApi,
    );

    res.status(200).json({
      success: true,
      message: "UI Generated Successfully ✅",
      data: generatedUI,
    });
  } catch (error) {
    console.error("❌ Route Error:", error.message);
    res.status(500).json({
      success: false,
      message: "The AI server failed to generate the UI. Please try again.",
    });
  }
});

router.post("/theme-ui", requireApiKey, async (req, res) => {
  const userApiKey = req.userApiKey;
  const requestBody = req.body || {};

  if (!requestBody.currentHtml || !requestBody.themePrompt) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Missing currentHtml or themePrompt.",
    });
  }

  try {
    const updatedUI = await applyThemeToUIService(
      requestBody.currentHtml,
      requestBody.themePrompt,
      userApiKey,
    );

    res.status(200).json({
      success: true,
      message: "Theme Applied Successfully!",
      data: updatedUI,
    });
  } catch (error) {
    console.error("❌ Theming Route Error:", error.message);
    res.status(500).json({
      success: false,
      message: "The AI server failed to apply the theme.",
    });
  }
});

export default router;
