import { embedText, cosineSimilarity } from '../utils/embedding';
import docs from '../data/docs/data.json';

export async function getRelevantChunks(query: string) {
  const queryVec = await embedText(query);
  return docs
    .map(doc => ({ ...doc, score: cosineSimilarity(queryVec, doc.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(doc => doc.text);
}