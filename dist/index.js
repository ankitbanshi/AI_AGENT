import express from "express";
import dotenv from "dotenv";
import agentRouter from "./routes/agent.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/agent", agentRouter);
app.get("/", (req, res) => {
    res.send("AI Agent Server is running...");
});
try {
    app.listen(PORT, () => {
        console.log(`Server running on PORT :${PORT}`);
    });
}
catch (err) {
    console.error("Error starting server:", err);
}
