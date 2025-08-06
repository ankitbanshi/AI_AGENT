export function buildPrompt({ memory, message, context, plugins }: any) {
  return `
You are a helpful assistant.

Memory:
${memory.map((m: any) => `${m.role}: ${m.content}`).join('\n')}

Relevant Context:
${context.join('\n')}

Plugin Outputs:
${plugins.join('\n')}

User: ${message}
`;
}