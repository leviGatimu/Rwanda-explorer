import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMnemonic = async (topic: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";

  try {
    const prompt = `
      Create a memorable mnemonic (acronym or rhyme) to help a student memorize facts about: "${topic}" in the context of Rwandan History or Citizenship Education.
      Keep it short, culturally relevant if possible, and provide a brief explanation of what each letter/part stands for.
      Format the output clearly.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate mnemonic.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred while connecting to the AI Tutor.";
  }
};

export const askHistoryTutor = async (question: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const prompt = `
      You are an expert tutor in Rwandan History and Citizenship.
      Answer the following question for a student: "${question}".
      Be accurate, respectful, and focus on unity, patriotism, and historical facts (Pre-colonial, Colonial, Independence, and Post-Genocide reconstruction).
      Keep the answer concise (under 150 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the history database right now.";
  }
};