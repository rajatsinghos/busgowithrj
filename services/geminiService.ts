
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly in the named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (from: string, to: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide travel advice for someone going from ${from} to ${to}. Mention the best time to visit, top 3 attractions, and a local food specialty. Format the output as a concise JSON-friendly string.`,
      config: {
        systemInstruction: "You are a professional travel assistant. Provide helpful, concise advice for bus travelers."
      }
    });
    // Use .text property, not .text()
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently unable to fetch travel advice. Enjoy your trip!";
  }
};

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are BusGo Assistant, a helpful AI for a bus ticket reservation website. You can help users find buses, explain amenities, and give travel tips. Be polite and professional."
      }
    });
    
    const response = await chat.sendMessage({ message });
    // Use .text property, not .text()
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I encountered an error. How else can I help you today?";
  }
};
