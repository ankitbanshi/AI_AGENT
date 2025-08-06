import express from 'express';
import dotenv from 'dotenv';
import agentRoutes from './routes/agent.ts';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/agent', agentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
