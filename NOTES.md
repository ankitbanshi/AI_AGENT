
# 📝 Development Notes – AI Agent Server (Gemini API + RAG + Embeddings)

## ✅ What Was AI-Generated vs Manually Written

### AI-Generated:
- Initial README template and sections
- Basic route structure for Express server (`/agent/message`)
- Prompts and Notes.md file
- Suggestions on rate-limit handling and error structure


### Manually Written:
- Project structure and folder setup (routes, services, utils)
- Plugin system and memory + context handling integration
- RAG pipeline: chunking, embedding, retrieval setup
- Gemini API integration helper (`generateGeminiResponse`)
- Postman test cases

---

## 🐞 Bugs Faced & Solutions

### 1. `Cannot find name 'relevantChunks'`
- **Cause**: Typo or undeclared variable.
- **Solution**: Used `getRelevantChunks()` properly with the result assigned before calling the model.

### 2. Gemini API type error: 
```
Argument of type '{ content: string; }' is not assignable...
```
- **Cause**: Incorrect input format for Gemini API method.
- **Solution**: Changed to use `model.generateContent(prompt: string)` instead of content object.

### 3. Quota exceeded – 429 error
- **Cause**: Free tier API rate limit exceeded.
- **Solution**: Added handling for retry, used flash model for testing (`gemini-1.5-flash-latest`) and limited input size.

### 4. Postman endpoint testing issue
- **Cause**: Wrong local URL or route path
- **Solution**: Confirmed API is running at `http://localhost:5000/agent/message` and selected POST method with correct JSON body.

---

## 🔌 Plugin Calls + 🧠 Memory + 🗃 Context Routing

### 1. **Plugin Calls**
- The agent determines plugin usage based on trigger keywords or command format in user input.
- A basic command parser dispatches the call to `pluginService.execute()`.

### 2. **Memory Handling**
- Session-based memory is stored in a Map (or can be extended to Redis/DB).
- Each `session_id` retains history context which is passed to the model on every call.

### 3. **Context + Embedding RAG Flow**
- Incoming user message is embedded using `@google/generative-ai` embedding model.
- Cosine similarity search is performed on vector store (currently in-memory; scalable to Pinecone/Weaviate).
- Top K relevant documents (chunks) are selected as context and prepended to user query.

```ts
const embeddedQuery = await embedPrompt(userMessage);
const relevantChunks = getRelevantChunks(embeddedQuery); 
const finalPrompt = relevantChunks.join("
") + "

User: " + userMessage;
```

- This final prompt is passed to the Gemini model to generate a context-aware response

---

## 🙌 Author Note
This project demonstrates the integration of Google Gemini API with embeddings, context-aware retrieval (RAG), and plugin extensibility using TypeScript in a modular backend server.
