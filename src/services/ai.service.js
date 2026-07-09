import { HfInference } from "@huggingface/inference";
import systemPrompt from "../config/prompt.js";

// const API_KEY = process.env.HUGGINGFACE_API_KEY;
const aiModel = "google/gemma-4-31B-it";

export const generateUISchemaService = async (base64Image, API_KEY) => {
  const hf = new HfInference(API_KEY);
  console.log("🤖 Initializing AI inference via Hugging Face SDK...");

  try {
    const response = await hf.chatCompletion({
      model: aiModel,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: systemPrompt,
            },
            {
              type: "image_url",
              image_url: { url: base64Image },
            },
          ],
        },
      ],
      max_tokens: 10000,
    });

    let rawText = response.choices[0].message.content;

    // Clean up any potential markdown code blocks the AI might inject
    let cleanJsonString = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.warn(
      "⚠️ AI Inference failed or timed out. Initializing Fallback Demo Mode.",
      error,
    );
  }
};

export const applyThemeToUIService = async (
  currentHtml,
  themePrompt,
  API_KEY,
) => {
const hf = new HfInference(API_KEY);
const systemPrompt = `You are an expert UI Reskinner and Tailwind CSS Master.
Your goal is to take an existing HTML document and completely change its aesthetic based on a user's prompt.

Return ONLY the raw HTML code. DO NOT wrap your response in a JSON object. DO NOT include conversational text.

## CORE RULES:
1. PRESERVE STRUCTURE: You MUST NOT add, remove, or alter any HTML tags, text content, image sources, or overall DOM structure. 
2. OVERHAUL STYLING: You may completely rewrite the Tailwind class="..." attributes to match the user's theme.
3. FORMATTING: Output standard, beautifully formatted, multi-line HTML. 

## MERMAID DIAGRAM RULES:
If the HTML contains a <div class='mermaid'>:
1. PRESERVE FLOW: Leave the layout text exactly as it is (e.g., A --> B). Do not change the text on the arrows.
2. NATURAL LINE BREAKS: Ensure each mermaid statement is on its own line. Do NOT minify it into a single line.
3. THEMING DIAGRAMS: To change colors, ONLY modify the hex color codes inside the classDef statements at the bottom.

User's Theme Request: "${themePrompt}"

Existing HTML to reskin:
${currentHtml}
`;

  try {
    const response = await hf.chatCompletion({
      model: aiModel,
      messages: [{ role: "user", content: systemPrompt }],
      max_tokens: 8000,
      temperature: 0.2,
    });

    const rawOutput = response.choices[0].message.content;

    const cleanedHtml = rawOutput
      .replace(/^```(html)?/i, "") // Remove opening ``` or ```html
      .replace(/```$/, "") // Remove closing ```
      .trim();

    return { html: cleanedHtml };
  } catch (error) {
    console.error("🎨 Theming Inference failed:", error);
    return { html: currentHtml };
  }
};
