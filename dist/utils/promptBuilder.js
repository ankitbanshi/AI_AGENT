export function buildPrompt({ memory, message, context, plugins, }) {
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
