import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function embedText(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-ada-002'
  });
  return res.data[0].embedding;
}
export function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (magA * magB);
}
