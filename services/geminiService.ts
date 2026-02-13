import { GoogleGenAI } from "@google/genai";

export const getDesignAdvice = async (userPrompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Use the API key exclusively from the environment variable as per guidelines.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API key not found. AI features disabled.");
    return "I'm currently in browsing mode. My design AI will be available once the system connection is fully initialized.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: "You are an elite architectural consultant for Cedar Lux Properties. Specialize in high-end lakefront designs on Cedar Creek Lake, TX. Focus on natural materials (Texas limestone, cedar, steel), luxury amenities (infinity pools, smart docks), and the specific lifestyle of wealthy Dallas-based owners.",
        temperature: 0.7,
      }
    });

    return response.text || "I'm currently taking in the lake view. Could you please rephrase your request?";
  } catch (error) {
    console.error("Gemini Consultation Error:", error);
    return "I'm having a brief connection issue with my design studio. Please try asking me again in a moment.";
  }
};