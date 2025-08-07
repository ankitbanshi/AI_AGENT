// src/services/agentService.ts
import { getMemoryForSession, saveToMemory } from './memoryService.ts';
import { getRelevantChunks } from './ragServices.ts';
import { parseAndExecutePlugins } from './pluginService.ts';
import { buildPrompt } from '../utils/promptBuilder.ts';
import { generateGeminiResponse } from './geminiServices.ts';

export async function handleMessage(message: string, sessionId: string) {
  const memory = getMemoryForSession(sessionId);
  const contextChunks = await getRelevantChunks(message);
  const pluginOutput = await parseAndExecutePlugins(message);
const relevantChunks = await getRelevantChunks(message); // ✅ Correct declaration

const prompt = buildPrompt({
  memory,
  message,
  context: relevantChunks,
  plugins: pluginOutput.join('\n'), // <-- Convert string[] to string
});

  const response = await generateGeminiResponse(prompt);

  saveToMemory(sessionId, { role: 'user', content: message });
  saveToMemory(sessionId, { role: 'assistant', content: response });

  return response;
}
