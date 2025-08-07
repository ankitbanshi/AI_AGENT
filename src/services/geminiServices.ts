import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
export async function generateGeminiResponse(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = await result.response.text();
  return response;
}
