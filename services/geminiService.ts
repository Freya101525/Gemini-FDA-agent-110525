
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { Agent } from '../types';

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to read blob as base64 string"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const performOcrOnImage = async (ai: GoogleGenAI, imageBlob: Blob): Promise<string> => {
  try {
    const base64Data = await blobToBase64(imageBlob);
    
    const imagePart = {
      inlineData: {
        mimeType: imageBlob.type,
        data: base64Data,
      },
    };

    const textPart = {
      text: "Perform OCR on this document image. Extract all text content verbatim, preserving the original structure and formatting as much as possible.",
    };
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error in Gemini OCR:", error);
    throw new Error("Gemini API failed to perform OCR on the image.");
  }
};


export const runAgent = async (ai: GoogleGenAI, agent: Agent, context: string): Promise<string> => {
    const fullPrompt = `
CONTEXT:
---
${context}
---

TASK:
${agent.prompt}

Please provide a detailed and structured response based on the task and context.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: agent.model,
            contents: fullPrompt,
            config: {
                temperature: agent.temperature,
                maxOutputTokens: agent.maxTokens,
            }
        });
        return response.text;
    } catch(error) {
        console.error(`Error executing agent "${agent.name}":`, error);
        throw new Error(`API call for agent "${agent.name}" failed.`);
    }
};

export const generateFollowUpQuestions = async (ai: GoogleGenAI, finalContext: string): Promise<string[]> => {
    const prompt = `
Based on the following final analysis, generate 3 insightful follow-up questions a user might ask to dig deeper into the topic.

FINAL ANALYSIS:
---
${finalContext}
---

Provide your response ONLY as a JSON array of strings, with no other text or formatting. For example: ["Question 1?", "Question 2?", "Question 3?"]
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            }
        });

        let jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating follow-up questions:", error);
        // Fallback for non-JSON response
        try {
            const fallbackResponse: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `${prompt}\n\nIMPORTANT: Make sure your response is a valid JSON array of strings.`,
            });
            let text = fallbackResponse.text;
            const jsonMatch = text.match(/\[.*?\]/s);
            if (jsonMatch) {
              return JSON.parse(jsonMatch[0]);
            }
        } catch (fallbackError) {
             console.error("Fallback for follow-up questions failed:", fallbackError);
        }
        return ["Could not generate follow-up questions due to an API error."];
    }
};
