import OpenAI from 'openai';
import { getMemoryForSession, saveToMemory } from './memoryService.ts';
import { getRelevantChunks } from './ragServices.ts';
import { parseAndExecutePlugins } from './pluginService.ts';
import { buildPrompt } from '../utils/promptBuilder.ts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function handleMessage(message: string, sessionId: string) {
  const memory = getMemoryForSession(sessionId);
  const relevantChunks = await getRelevantChunks(message);
  const pluginOutput = await parseAndExecutePlugins(message);

  const prompt = buildPrompt({
    memory,
    message,
    context: relevantChunks,
    plugins: pluginOutput,
  });

  const response = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  saveToMemory(sessionId, { role: 'user', content: message });
  saveToMemory(sessionId, { role: 'assistant', content: response.choices[0].message.content ?? '' });

  return response.choices[0].message.content;
}