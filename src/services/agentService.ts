// src/services/agentService.ts
import { getMemoryForSession, saveToMemory } from './memoryService.js';
import { getRelevantChunks } from './ragServices.js';
import { parseAndExecutePlugins } from './pluginService.js';
import { buildPrompt } from '../utils/promptBuilder.js';
import { generateGeminiResponse } from './geminiServices.js';

export async function handleMessage(message: string, sessionId: string) {
  const memory = getMemoryForSession(sessionId);
  const contextChunks = await getRelevantChunks(message);
  const pluginOutput = await parseAndExecutePlugins(message);
const relevantChunks = await getRelevantChunks(message); 

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
