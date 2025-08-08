const sessions = {};
export function getMemoryForSession(sessionId) {
    return sessions[sessionId]?.slice(-2) || [];
}
export function saveToMemory(sessionId, message) {
    if (!sessions[sessionId])
        sessions[sessionId] = [];
    sessions[sessionId].push(message);
}
