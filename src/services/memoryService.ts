const sessions: Record<string, { role: string, content: string }[]> = {};

export function getMemoryForSession(sessionId: string) {
  return sessions[sessionId]?.slice(-2) || [];
}

export function saveToMemory(sessionId: string, message: { role: string, content: string }) {
  if (!sessions[sessionId]) sessions[sessionId] = [];
  sessions[sessionId].push(message);
}