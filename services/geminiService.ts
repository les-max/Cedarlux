
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    return (window as any).process?.env?.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const getDesignAdvice = async (userPrompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const apiKey = getApiKey();
  
  if (!apiKey || apiKey === "") {
    console.warn("Gemini API key not found. AI features disabled.");
    return "I'm currently in browsing mode. To activate my design AI, please ensure an API key is provided in the project settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: h.parts })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: `You are an elite architectural consultant for Cedar Lux Properties. 
        Specialize in high-end lakefront designs on Cedar Creek Lake, TX. 
        Focus on natural materials (Texas limestone, cedar, steel), luxury amenities (infinity pools, smart docks), 
        and the specific lifestyle of wealthy Dallas-based owners.`,
        temperature: 0.7,
      }
    });

    return response.text || "I'm currently taking in the lake view. Could you please rephrase your request?";
  } catch (error) {
    console.error("Gemini Consultation Error:", error);
    return "I'm having a brief connection issue with my design studio. Please try asking me again in a moment.";
  }
};
