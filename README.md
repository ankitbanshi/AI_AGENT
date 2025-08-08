# 🤖 AI Agent Server – Gemini API Integration with RAG (TypeScript + Node.js)

A simple and powerful AI Agent Server built using **Node.js**, **TypeScript**, **Express.js**, and **Google's Gemini API**. It provides an endpoint to send prompts and get AI-generated responses via Gemini 1.5 models, with **RAG (Retrieval-Augmented Generation)** and **embeddings** support.

---

## 🚀 Features

- ✅ AI-powered responses using Gemini (`gemini-1.5-flash-latest`)
- 🧠 Ready for **RAG** with document embeddings
- 🔍 Retrieves relevant context using semantic similarity
- 🌐 REST API endpoint (`/agent/message`)
- 🔐 Environment-based API key management
- 💬 Easily extendable for memory, plugins, or session-based history

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **@google/generative-ai** (Gemini API SDK)
- **dotenv**

---

## 📂 Project Structure

```
src/
├── routes/
│   └── agent.ts              # POST /agent/message route
├── services/
│   ├── agentService.ts       # Handles AI message flow
│   ├── geminiService.ts      # Gemini response & embedding logic
│   └── vectorService.ts      # RAG-related embedding storage/search (optional)
├── utils/                    # Helper functions
└── index.ts                  # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-agent-server.git
cd ai-agent-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
GEMINI_API_KEY=your_google_api_key_here
```

🔑 Get your API key from: https://makersuite.google.com/app/apikey

---

## ▶️ Running the Server

```bash
npm run dev
```

By default, the server will run at: `http://localhost:5000`

---

## 📨 API Usage

### Endpoint

```
POST /agent/message
```

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "message": "Explain RAG in simple terms",
  "session_id": "abc123"
}
```

### Response

```json
{
  "reply": "RAG stands for Retrieval-Augmented Generation..."
}
```

---

## 🧪 Test in Postman

1. Open **Postman**
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/agent/message`
4. Go to **Body > raw > JSON** and enter:

```json
{
  "message": "What is Gemini API?",
  "session_id": "test-123"
}
```

5. Click **Send** ✅

## 📄 License

MIT License.  
Feel free to fork, modify, and contribute.
---

## 🙌 Credits
- [Google Gemini API](https://ai.google.dev/)
- [OpenAI ChatGPT](https://chat.openai.com/)
