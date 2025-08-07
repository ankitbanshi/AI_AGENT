interface PromptInput {
  memory: { role: string; content: string }[];
  message: string;
  context: string[];
  plugins: string;
}

export function buildPrompt({
  memory,
  message,
  context,
  plugins,
}: PromptInput): string {
  const contextStr = context.join("\n---\n");
  const memoryStr = memory.map((m) => `${m.role}: ${m.content}`).join("\n");

  return `
You are an intelligent AI assistant.

Context:
${contextStr}

Memory:
${memoryStr}

Plugin Output:
${plugins}

User:
${message}
`;
}
