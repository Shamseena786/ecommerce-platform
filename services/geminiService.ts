
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Initialize the Gemini API client using the API key from environment variables exclusively.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { 
              type: Type.STRING,
              description: "The textual response to the user"
            },
            suggestedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of product IDs recommended"
            }
          },
          required: ["text"]
        }
      }
    });

    // Extract text directly from response.text property (not a method)
    const result = JSON.parse(response.text || '{}');
    return {
      text: result.text || "I'm sorry, I couldn't process that. How can I help you shop today?",
      suggestedProductIds: result.suggestedProductIds || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I encountered a slight glitch. I'm still here to help with your shopping!",
      suggestedProductIds: []
    };
  }
};
