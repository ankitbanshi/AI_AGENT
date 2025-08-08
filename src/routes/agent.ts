import express from "express";
import { handleMessage } from "../services/agentService.js";

const router = express.Router();

router.post("/message", async (req, res) => {
  const { message, session_id } = req.body;
  if (!message || !session_id)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const reply = await handleMessage(message, session_id);
    res.json({ reply });
  } catch (error) {
    console.error("Error in /agent/message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
