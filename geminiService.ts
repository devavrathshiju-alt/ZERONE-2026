
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePitchProduct = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a futuristic, quirky, or highly advanced consumer product for a pitch competition. Make it sound innovative yet believable in 2026.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          techUsed: { type: Type.STRING },
        },
        required: ["name", "description", "targetAudience", "techUsed"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};
