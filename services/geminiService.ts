
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Updated history type to use array instead of tuple for parts to resolve TypeScript mismatch
export const getDesignAdvice = async (userPrompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: h.parts })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        // Correctly move system-level instructions to systemInstruction property
        systemInstruction: `You are a luxury home design consultant for Cedar Lux Properties, specializing in Cedar Creek Lake estates in East Texas. 
          Your goal is to help wealthy clients from Dallas design their dream lake house. 
          You should talk about architectural styles (Modern Farmhouse, Texas Transitional, Contemporary Lakefront), 
          outdoor living features (infinity pools, boat houses, outdoor kitchens), and interior finishes (white oak, marble, oversized windows).
          Be sophisticated, helpful, and professional. 
          Respond briefly but elegantly. Use markdown for lists.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, my creative circuits are momentarily resting by the lake. How else can I assist with your vision?";
  }
};
