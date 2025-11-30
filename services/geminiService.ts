import { GoogleGenAI, Type } from "@google/genai";
import { ColorRole, Palette } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePalette = async (prompt: string): Promise<Omit<Palette, 'id' | 'createdAt'>> => {
  const modelId = "gemini-2.5-flash";

  const response = await ai.models.generateContent({
    model: modelId,
    contents: `Generate a cohesive and beautiful color palette based on this description: "${prompt}".
    Ensure high contrast and usability for UI design.
    The palette MUST strictly include colors for these specific roles:
    1. primary (Main brand color)
    2. secondary (Supporting brand color)
    3. accent (Highlights, calls to action)
    4. background (Main page background, usually neutral or very dark/light)
    5. surface (Card/Component background, contrasting with background)
    6. text_main (High contrast text)
    7. text_muted (Lower contrast text)
    
    Provide a creative name for the palette and a short description of the vibe.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Creative name for the palette" },
          description: { type: Type.STRING, description: "Short description of the vibe" },
          colors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING, description: "Hex code e.g. #FF5500" },
                name: { type: Type.STRING, description: "Creative color name" },
                role: { 
                  type: Type.STRING, 
                  enum: [
                    ColorRole.PRIMARY, 
                    ColorRole.SECONDARY, 
                    ColorRole.ACCENT, 
                    ColorRole.BACKGROUND, 
                    ColorRole.SURFACE, 
                    ColorRole.TEXT_MAIN, 
                    ColorRole.TEXT_MUTED
                  ] 
                },
                description: { type: Type.STRING, description: "Why this color fits the role" }
              },
              required: ["hex", "name", "role", "description"]
            }
          }
        },
        required: ["name", "description", "colors"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  try {
    const data = JSON.parse(text);
    return data as Omit<Palette, 'id' | 'createdAt'>;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Invalid response format");
  }
};